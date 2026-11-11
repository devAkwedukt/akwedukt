import { createClient } from "@sanity/client";
import type {
  FacebookDraftDocument,
  FacebookDraftDocumentWithMedia,
  SanityImageReference,
} from "./types";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const MAX_IMAGES_PER_DRAFT = 10;
const IMAGE_DOWNLOAD_TIMEOUT_MS = 20_000;
const MAX_IMAGE_REDIRECTS = 3;

export type SanityWriteClient = {
  getDocument: (id: string) => Promise<{ _id: string } | undefined>;
  createIfNotExists: (document: FacebookDraftDocumentWithMedia) => Promise<unknown>;
  assets: {
    upload: (
      type: "image",
      body: Buffer,
      options: { filename: string; contentType: string }
    ) => Promise<{ _id: string }>;
  };
};

export type CreateDraftOptions = {
  client: SanityWriteClient;
  draft: FacebookDraftDocument;
  imageUrls: string[];
  fetcher?: typeof fetch;
};

type DownloadedImage = {
  body: Buffer;
  contentType: string;
  filename: string;
};

function isAllowedMetaMediaHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  const allowedSuffixes = ["fbcdn.net", "fbsbx.com", "facebook.com"];

  return allowedSuffixes.some(
    (suffix) => normalized === suffix || normalized.endsWith(`.${suffix}`)
  );
}

export function isAllowedFacebookImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && isAllowedMetaMediaHostname(url.hostname);
  } catch {
    return false;
  }
}

function extensionForContentType(contentType: string): string {
  const extensions: Record<string, string> = {
    "image/avif": "avif",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return extensions[contentType] ?? "img";
}

function filenameFromUrl(value: string, contentType: string, index: number): string {
  const url = new URL(value);
  const encodedName = url.pathname.split("/").pop() ?? "";
  let decodedName = encodedName;

  try {
    decodedName = decodeURIComponent(encodedName);
  } catch {
    // Keep the encoded path segment if it contains malformed escape sequences.
  }

  const rawName = decodedName
    .replace(/[^a-z0-9._-]+/giu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

  if (rawName && /\.[a-z0-9]{2,5}$/iu.test(rawName)) return rawName;

  return `facebook-post-${index + 1}.${extensionForContentType(contentType)}`;
}

async function fetchFacebookImageResponse(
  imageUrl: string,
  fetcher: typeof fetch,
  signal: AbortSignal,
  redirectCount = 0
): Promise<{ response: Response; finalUrl: string }> {
  if (!isAllowedFacebookImageUrl(imageUrl)) {
    throw new Error("Facebook image URL is not on an approved Meta media host");
  }

  const response = await fetcher(imageUrl, {
    method: "GET",
    headers: { Accept: "image/*" },
    redirect: "manual",
    cache: "no-store",
    signal,
  });

  if ([301, 302, 303, 307, 308].includes(response.status)) {
    if (redirectCount >= MAX_IMAGE_REDIRECTS) {
      throw new Error("Facebook image download exceeded the redirect limit");
    }

    const location = response.headers.get("location");
    if (!location) throw new Error("Facebook image redirect has no location");

    const redirectedUrl = new URL(location, imageUrl).toString();
    return fetchFacebookImageResponse(redirectedUrl, fetcher, signal, redirectCount + 1);
  }

  return { response, finalUrl: imageUrl };
}

async function downloadFacebookImage(
  imageUrl: string,
  index: number,
  fetcher: typeof fetch
): Promise<DownloadedImage> {
  const { response, finalUrl } = await fetchFacebookImageResponse(
    imageUrl,
    fetcher,
    AbortSignal.timeout(IMAGE_DOWNLOAD_TIMEOUT_MS)
  );

  if (!response.ok) {
    throw new Error(`Facebook image download failed with HTTP ${response.status}`);
  }

  const contentType = (response.headers.get("content-type") ?? "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase();
  const declaredSize = Number(response.headers.get("content-length"));

  if (!contentType.startsWith("image/")) {
    throw new Error("Facebook media response is not an image");
  }

  if (Number.isFinite(declaredSize) && declaredSize > MAX_IMAGE_BYTES) {
    throw new Error("Facebook image is larger than the 15 MB safety limit");
  }

  const body = Buffer.from(await response.arrayBuffer());

  if (body.byteLength === 0) {
    throw new Error("Facebook image response is empty");
  }

  if (body.byteLength > MAX_IMAGE_BYTES) {
    throw new Error("Facebook image is larger than the 15 MB safety limit");
  }

  return {
    body,
    contentType,
    filename: filenameFromUrl(finalUrl, contentType, index),
  };
}

function imageReference(assetId: string, alt?: string): SanityImageReference {
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetId,
    },
    ...(alt ? { alt } : {}),
  };
}

function attachImages(
  draft: FacebookDraftDocument,
  assetIds: string[]
): FacebookDraftDocumentWithMedia {
  const [featuredAssetId, ...sliderAssetIds] = assetIds;

  return {
    ...draft,
    ...(featuredAssetId ? { featuredMedia: imageReference(featuredAssetId) } : {}),
    ...(sliderAssetIds.length > 0
      ? {
          slider: sliderAssetIds.map((assetId, index) => ({
            _key: `facebook-image-${index + 2}`,
            image: imageReference(assetId, draft.title),
          })),
        }
      : {}),
  };
}

export function createSanityFacebookImportClient(options: {
  dataset: "development" | "production";
  token: string;
}): SanityWriteClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim();

  if (!projectId || !apiVersion) {
    throw new Error("Sanity project ID or API version is not configured");
  }

  const client = createClient({
    projectId,
    dataset: options.dataset,
    apiVersion,
    token: options.token,
    useCdn: false,
  });

  return {
    getDocument: (id) => client.getDocument<{ _id: string }>(id),
    createIfNotExists: (document) => client.createIfNotExists(document),
    assets: {
      upload: (type, body, uploadOptions) => client.assets.upload(type, body, uploadOptions),
    },
  };
}

export async function createFacebookDraftInSanity({
  client,
  draft,
  imageUrls,
  fetcher = fetch,
}: CreateDraftOptions): Promise<{ created: boolean; documentId: string; imageCount: number }> {
  if (!draft._id.startsWith("drafts.facebook-") || draft.status !== "draft") {
    throw new Error("Refusing to create a non-Facebook or non-draft Sanity document");
  }

  const publishedDocumentId = draft._id.slice("drafts.".length);
  const [existingDraft, existingPublishedDocument] = await Promise.all([
    client.getDocument(draft._id),
    client.getDocument(publishedDocumentId),
  ]);

  if (existingDraft || existingPublishedDocument) {
    return { created: false, documentId: draft._id, imageCount: 0 };
  }

  const assetIds: string[] = [];

  for (const [index, imageUrl] of imageUrls.slice(0, MAX_IMAGES_PER_DRAFT).entries()) {
    const image = await downloadFacebookImage(imageUrl, index, fetcher);
    const asset = await client.assets.upload("image", image.body, {
      filename: image.filename,
      contentType: image.contentType,
    });
    assetIds.push(asset._id);
  }

  await client.createIfNotExists(attachImages(draft, assetIds));

  return {
    created: true,
    documentId: draft._id,
    imageCount: assetIds.length,
  };
}

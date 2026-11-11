import { createHmac } from "node:crypto";

const GRAPH_API_VERSION = "v27.0";
const GRAPH_REQUEST_TIMEOUT_MS = 15_000;
const MAX_IMAGES_PER_POST = 10;

type UnknownRecord = Record<string, unknown>;

export type FacebookGraphPost = {
  id: string;
  message?: string;
  createdTime: string;
  permalinkUrl?: string;
  authorPageId?: string;
  imageUrls: string[];
};

type FetchFacebookPostOptions = {
  postId: string;
  pageAccessToken: string;
  appSecret: string;
  fetcher?: typeof fetch;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function addHttpsUrl(urls: Set<string>, value: unknown) {
  if (urls.size >= MAX_IMAGES_PER_POST || typeof value !== "string") return;

  try {
    const url = new URL(value);
    if (url.protocol === "https:") urls.add(url.toString());
  } catch {
    // A malformed attachment URL is ignored. It cannot be downloaded safely.
  }
}

function collectAttachmentImages(value: unknown, urls: Set<string>) {
  if (urls.size >= MAX_IMAGES_PER_POST || !isRecord(value)) return;

  const media = isRecord(value.media) ? value.media : undefined;
  const image = media && isRecord(media.image) ? media.image : undefined;
  addHttpsUrl(urls, image?.src);

  const subattachments = isRecord(value.subattachments) ? value.subattachments : undefined;
  const data = subattachments && Array.isArray(subattachments.data) ? subattachments.data : [];

  for (const attachment of data) {
    collectAttachmentImages(attachment, urls);
    if (urls.size >= MAX_IMAGES_PER_POST) break;
  }
}

export function extractFacebookImageUrls(payload: unknown): string[] {
  if (!isRecord(payload)) return [];

  const urls = new Set<string>();
  const attachments = isRecord(payload.attachments) ? payload.attachments : undefined;
  const data = attachments && Array.isArray(attachments.data) ? attachments.data : [];

  for (const attachment of data) {
    collectAttachmentImages(attachment, urls);
    if (urls.size >= MAX_IMAGES_PER_POST) break;
  }

  // full_picture is a useful fallback for posts whose attachment expansion has no image.
  if (urls.size === 0) addHttpsUrl(urls, payload.full_picture);

  return [...urls];
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function graphErrorMessage(payload: unknown): string {
  if (!isRecord(payload) || !isRecord(payload.error)) return "Unknown Graph API error";

  const message = optionalString(payload.error.message);
  const code =
    typeof payload.error.code === "number" || typeof payload.error.code === "string"
      ? String(payload.error.code)
      : undefined;

  return (
    [code ? `code ${code}` : undefined, message].filter(Boolean).join(": ") ||
    "Unknown Graph API error"
  );
}

export async function fetchFacebookPost({
  postId,
  pageAccessToken,
  appSecret,
  fetcher = fetch,
}: FetchFacebookPostOptions): Promise<FacebookGraphPost> {
  const url = new URL(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(postId)}`
  );
  url.searchParams.set(
    "fields",
    [
      "id",
      "message",
      "created_time",
      "permalink_url",
      "from{id}",
      "full_picture",
      "attachments.limit(10){media_type,type,media,subattachments.limit(10){media_type,type,media}}",
    ].join(",")
  );
  url.searchParams.set(
    "appsecret_proof",
    createHmac("sha256", appSecret).update(pageAccessToken).digest("hex")
  );

  const response = await fetcher(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${pageAccessToken}`,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(GRAPH_REQUEST_TIMEOUT_MS),
  });
  const payload = await readJson(response);

  if (!response.ok) {
    throw new Error(`Facebook Graph API request failed (${graphErrorMessage(payload)})`);
  }

  if (!isRecord(payload)) {
    throw new Error("Facebook Graph API returned an invalid response");
  }

  const id = optionalString(payload.id);
  const createdTime = optionalString(payload.created_time);

  if (!id || !createdTime || Number.isNaN(new Date(createdTime).getTime())) {
    throw new Error("Facebook Graph API response is missing a valid post ID or creation time");
  }

  const author = isRecord(payload.from) ? payload.from : undefined;

  return {
    id,
    message: optionalString(payload.message),
    createdTime,
    permalinkUrl: optionalString(payload.permalink_url),
    authorPageId: optionalString(author?.id),
    imageUrls: extractFacebookImageUrls(payload),
  };
}

import { fetchWithRetry } from "./fetchWithRetry";
import type { UploadClientConfigWithAltText } from "./wpImageFetch";

type SanityImageAssetDocument = {
  _id: string;
  _type?: string;
  [key: string]: unknown;
};

type SanityClientForImageUpload = {
  assets: {
    upload: (
      assetType: "image",
      body: Buffer,
      options?: UploadClientConfigWithAltText
    ) => Promise<SanityImageAssetDocument>;
  };
};

export async function sanityUploadFromUrl(
  url: string,
  client: SanityClientForImageUpload,
  metadata: UploadClientConfigWithAltText
): Promise<SanityImageAssetDocument | null> {
  const response = await fetchWithRetry(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}: ${response.status}`);
  }

  try {
    const fileBuffer = Buffer.from(await response.arrayBuffer());
    const data = await client.assets.upload("image", fileBuffer, metadata);
    return data;
  } catch (error) {
    console.error(`Failed to upload image from ${url}`);
    console.error(error);
    return null;
  }
}

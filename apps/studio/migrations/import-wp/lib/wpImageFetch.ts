import { decode } from "html-entities";

import { BASE_URL } from "../constants";
import { fetchWithRetry } from "./fetchWithRetry";

export interface UploadClientConfigWithAltText {
  filename?: string;
  source?: {
    id: string;
    name: string;
    url?: string;
  };
  title?: string;
  description?: string;
  creditLine?: string;
  // Not technically part of the Sanity imageAsset schema, but used by the popular Media Plugin
  altText?: string;
  [key: string]: unknown;
}

// Get WordPress' asset metadata about an image by its ID
export async function wpImageFetch(id: number): Promise<UploadClientConfigWithAltText | null> {
  const wpApiUrl = new URL(`${BASE_URL}/media/${id}`).toString();
  const response = await fetchWithRetry(wpApiUrl);
  if (!response.ok) {
    return null;
  }

  const imageData = await response.json();

  if (!imageData || !imageData.source_url) {
    return null;
  }

  let metadata: UploadClientConfigWithAltText = {
    filename: imageData.source_url.split("/").pop(),
    source: {
      id: String(imageData.id),
      name: "WordPress",
      url: imageData.source_url,
    },
    // Not technically part of the Sanity imageAsset schema, but used by the popular Media Plugin
    altText: imageData.alt_text,
  };

  if (imageData?.title?.rendered) {
    metadata.title = decode(imageData.title.rendered);
  }

  if (imageData?.image_meta?.caption) {
    metadata.description = imageData.image_meta.caption;
  }

  if (imageData?.image_meta?.credit) {
    metadata.creditLine = imageData.image_meta.credit;
  }

  return metadata;
}

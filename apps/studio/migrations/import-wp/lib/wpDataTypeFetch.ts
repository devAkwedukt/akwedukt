import { BASE_URL, PER_PAGE } from "../constants";
import type { WordPressDataType, WordPressDataTypeResponses } from "../types";
import { fetchWithRetry } from "./fetchWithRetry";

export async function wpDataTypeFetch<T extends WordPressDataType>(
  type: T,
  page: number
): Promise<WordPressDataTypeResponses[T]> {
  const wpApiUrl = new URL(`${BASE_URL}/${type}`);
  wpApiUrl.searchParams.set("page", page.toString());
  wpApiUrl.searchParams.set("per_page", PER_PAGE.toString());

  const response = await fetchWithRetry(wpApiUrl);
  if (!response.ok) {
    throw new Error(
      `WordPress API request failed for "${type}" page ${page} with status ${response.status}`
    );
  }

  return (await response.json()) as WordPressDataTypeResponses[T];
}

import { client } from "./client";
import { defineLive } from "next-sanity/live";
import { draftMode } from "next/headers";

export const DEFAULT_REVALIDATE_TIME = 21600; // 6 hours

/**
 * You can configure time based revalidation by setting `revalidate` in the Next.js fetch options
 * This will apply globally to all queries made with `sanityFetch`
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});

// Production fetcher without live mode for proper ISR
export const sanityFetchProduction = async ({ query, params }: any) => {
  const { isEnabled } = await draftMode();

  // Always use live fetch in development or when draft mode is enabled
  if (process.env.NODE_ENV === "development" || isEnabled) {
    return sanityFetch({ query, params });
  }

  // Use regular client fetch in production for proper ISR
  const data = await client.fetch(query, params, {
    next: { revalidate: 21600 },
  });
  return { data };
};

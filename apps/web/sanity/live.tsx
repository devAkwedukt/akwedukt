import { client } from "./client";
import { defineLive } from "next-sanity/live";

/**
 * Revalidation is handled by the Sanity webhook at /api/revalidate
 * which calls revalidateTag when content changes in Sanity
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: process.env.SANITY_API_READ_TOKEN,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  fetchOptions: {
    revalidate: Number(process.env.DEFAULT_REVALIDATE),
  },
});

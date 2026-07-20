import { client } from "./client";
import { defineLive } from "next-sanity/live";

/**
 * You can configure time based revalidation by setting `revalidate` in the Next.js fetch options
 * This will apply globally to all queries made with `sanityFetch`
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});

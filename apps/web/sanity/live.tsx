import { draftMode } from "next/headers";
import { defineLive } from "next-sanity/live";

import { client } from "./client";

export const DEFAULT_REVALIDATE_TIME = 21600; // 6h

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});

export type CacheTag =
  | string
  | string[]
  | {
      type: "post" | "project";
      slug: string;
    };

type SanityFetchProductionProps = {
  query: string;
  params?: Record<string, unknown>;
  cache?: CacheTag;
};

function resolveTags(cache?: CacheTag): string[] {
  if (!cache) return [];

  if (Array.isArray(cache)) {
    return cache;
  }

  if (typeof cache === "string") {
    return [`page:${cache}`];
  }

  switch (cache.type) {
    case "post":
      return ["posts", `post:${cache.slug}`];

    case "project":
      return ["projects", `project:${cache.slug}`];
  }
}

export async function sanityFetchProduction({ query, params, cache }: SanityFetchProductionProps) {
  const { isEnabled } = await draftMode();

  if (process.env.NODE_ENV === "development" || isEnabled) {
    return sanityFetch({ query, params });
  }

  const data = await client.fetch(query, params, {
    next: {
      revalidate: DEFAULT_REVALIDATE_TIME,
      tags: resolveTags(cache),
    },
  });

  return { data };
}

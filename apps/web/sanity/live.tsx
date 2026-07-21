import { draftMode } from "next/headers";
import { defineLive } from "next-sanity/live";

import { client } from "./client";

export const DEFAULT_REVALIDATE_TIME = 21600; // 6h

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});

type EntityTag =
  | {
      type: "post" | "project";
      slug: string;
    }
  | {
      type: "page";
      name: string;
    };

type CacheTag = string | EntityTag;

type SanityFetchProductionProps = Parameters<typeof sanityFetch>[0] & {
  cache?: CacheTag | CacheTag[];
};

function resolveTags(cache?: CacheTag | CacheTag[]) {
  if (!cache) return [];

  const items = Array.isArray(cache) ? cache : [cache];

  const tags = new Set<string>();

  for (const item of items) {
    if (typeof item === "string") {
      tags.add(item);
      continue;
    }

    switch (item.type) {
      case "page":
        tags.add(`page:${item.name}`);
        break;

      case "post":
        tags.add("posts");
        tags.add(`post:${item.slug}`);
        break;

      case "project":
        tags.add("projects");
        tags.add(`project:${item.slug}`);
        break;
    }
  }

  return [...tags];
}

export async function sanityFetchProduction({ cache, ...options }: SanityFetchProductionProps) {
  const { isEnabled } = await draftMode();

  if (process.env.NODE_ENV === "development" || isEnabled) {
    return sanityFetch(options);
  }

  const data = await client.fetch(options.query, options.params, {
    perspective: options.perspective,
    stega: options.stega,
    next: {
      revalidate: DEFAULT_REVALIDATE_TIME,
      tags: resolveTags(cache),
    },
  });

  return { data };
}

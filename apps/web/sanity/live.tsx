import { client } from "./client";

export const DEFAULT_REVALIDATE_TIME = 21600; // 6h

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

type SanityPerspective = "published" | "drafts" | "raw";

type SanityFetchProductionProps = {
  query: string;
  params?: Record<string, unknown>;
  perspective?: SanityPerspective;
  stega?: boolean;
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
  const data = await client.fetch(options.query, options.params, {
    perspective: options.perspective ?? "published",
    stega: options.stega ?? false,
    next: {
      revalidate: DEFAULT_REVALIDATE_TIME,
      tags: resolveTags(cache),
    },
  });

  return { data };
}

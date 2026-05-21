import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { builtinTypes } from "@sanity/schema/_internal";
import { randomUUID } from "node:crypto";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import { defineField, defineType, type FieldDefinition, type SanityClient } from "sanity";

import type { Post } from "../../../../web/sanity/typegen";
import { BASE_URL } from "../constants";
import { fetchWithRetry } from "./fetchWithRetry";
import { sanityIdToImageReference } from "./sanityIdToImageReference";
import { sanityUploadFromUrl } from "./sanityUploadFromUrl";
import { wpImageFetch } from "./wpImageFetch";

type PostContent = NonNullable<Post["content"]>;
type PortableTextSpan = NonNullable<
  Extract<PostContent[number], { _type: "block" }>["children"]
>[number];

// Keep this migration schema minimal and self-contained so `sanity migration run`
// doesn't need to load Studio-only files (e.g. custom TSX input components).
const portableTextForMigration = defineField({
  name: "portableText",
  type: "array",
  of: [{ type: "block" }, { type: "image" }, { type: "externalImage" }],
});

const externalImageForMigration = defineType({
  name: "externalImage",
  title: "External Image",
  type: "object",
  fields: [
    {
      name: "url",
      title: "URL",
      type: "url",
    },
  ],
});

const migrationPostType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [defineField({ name: "content", type: "portableText" })],
});

// Include Sanity built-ins so image member fields (hotspot/crop) can be resolved.
const defaultSchema = Schema.compile({
  name: "wpMigrationSchema",
  types: [migrationPostType, portableTextForMigration, externalImageForMigration, ...builtinTypes],
});
const blockContentSchema = defaultSchema
  .get("post")
  .fields.find((field: FieldDefinition) => field.name === "content").type;

// https://github.com/portabletext/editor/tree/main/packages/block-tools
export async function htmlToBlockContent(
  html: string,
  client: SanityClient,
  imageCache: Record<number, string>
): Promise<PostContent> {
  // Convert HTML to Sanity's Portable Text
  let blocks = htmlToBlocks(html, blockContentSchema, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(node, next, block) {
          const el = node as HTMLElement;

          if (node.nodeName.toLowerCase() === "figure") {
            const url = el.querySelector("img")?.getAttribute("src");

            if (!url) {
              return undefined;
            }

            return block({
              // these attributes may be overwritten by the image upload below
              _type: "externalImage",
              url,
            });
          }

          return undefined;
        },
      },
    ],
  }) as unknown as PostContent;

  // Note: Multiple documents may be running this same function concurrently
  const limit = pLimit(2);

  const blocksWithUploads = blocks.map((block) =>
    limit(async () => {
      if (block._type !== "externalImage" || !("url" in block)) {
        return block;
      }

      // The filename is usually stored as the "slug" in WordPress media documents
      // Filename may be appended with dimensions like "-1024x683", remove with regex
      const dimensions = /-\d+x\d+$/;
      let slug = (block.url as string)
        .split("/")
        .pop()
        ?.split(".")
        ?.shift()
        ?.replace(dimensions, "")
        .toLocaleLowerCase();

      const imageId = await fetchWithRetry(`${BASE_URL}/media?slug=${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => (Array.isArray(data) && data.length ? data[0].id : null));

      if (typeof imageId !== "number" || !imageId) {
        return block;
      }

      if (imageCache[imageId]) {
        return {
          _key: block._key,
          ...sanityIdToImageReference(imageCache[imageId]),
        } as Extract<Post["content"], { _type: "image" }>;
      }

      const imageMetadata = await wpImageFetch(imageId);
      if (imageMetadata?.source?.url) {
        const imageDocument = await sanityUploadFromUrl(
          imageMetadata.source.url,
          client,
          imageMetadata
        );
        if (imageDocument) {
          // Add to in-memory cache if re-used in other documents
          imageCache[imageId] = imageDocument._id;

          return {
            _key: block._key,
            ...sanityIdToImageReference(imageCache[imageId]),
          } as Extract<Post["content"], { _type: "image" }>;
        } else {
          return block;
        }
      }

      return block;
    })
  );

  blocks = await Promise.all(blocksWithUploads);

  // Eliminate empty blocks
  blocks = blocks.filter((block) => {
    if (!block) {
      return false;
    } else if (!("children" in block) || !Array.isArray(block.children)) {
      return true;
    }

    return (
      block.children
        .map((c: PortableTextSpan) => (typeof c.text === "string" ? c.text.trim() : ""))
        .join("").length > 0
    );
  });

  return blocks.map((block) =>
    block._key ? block : { ...block, _key: randomUUID() }
  ) as PostContent;
}

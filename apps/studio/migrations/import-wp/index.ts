//import type { SanityDocumentLike } from "sanity";
import { createClient } from "@sanity/client";
import pLimit from "p-limit";
import { createOrReplace, defineMigration } from "sanity/migrate";
import type { WP_REST_API_Post } from "wp-types";

import { getDataTypes } from "./lib/getDataTypes";
import { sanityFetchImages } from "./lib/sanityFetchImages";
import { transformToPost } from "./lib/transformToPost";
import { wpDataTypeFetch } from "./lib/wpDataTypeFetch";

const limit = pLimit(5); // Limit concurrent fetches to avoid overwhelming the WP API

export default defineMigration({
  title: "Import WP JSON data",

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config());

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client);

    const { wpType } = getDataTypes(process.argv);
    if (wpType !== "posts") {
      throw new Error(
        `This migration currently supports only --type=posts. Received: "${wpType}".`
      );
    }

    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        let wpData = await wpDataTypeFetch(wpType, page);

        if (Array.isArray(wpData) && wpData.length) {
          // Create an array of concurrency-limited promises to stage documents
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              const post = wpDoc as WP_REST_API_Post;
              return transformToPost(post, client, existingImages);
            })
          );

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs);

          yield resolvedDocs.map((doc) => createOrReplace(doc));
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error);
        // Stop the loop in case of an error
        hasMore = false;
      }
    }
  },
});

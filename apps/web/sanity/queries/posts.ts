import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { cache } from "react";
import type { Post } from "../typegen";

// Type for post with expanded categories and tags (using typegen structure)
export type PostWithExpandedCategories = Omit<Exclude<Post, null>, "categories" | "tags"> & {
  categories?: Array<{
    _key: string;
    _id: string;
    name?: string;
    slug?: { current?: string };
  }>;
  tags?: Array<{
    _key: string;
    _id: string;
    name?: string;
    slug?: { current?: string };
  }>;
};

export const POST_BY_ID_QUERY = defineQuery(`*[_id == $postId][0]{
  _id,
  title,
  slug,
  date,
  status,
  content,
  excerpt,
  featuredMedia,
  categories[]->{
    _id,
    name,
    slug
  },
  tags[]->{
    _id,
    name,
    slug
  }
}`);

export const getPostById = cache(async (postId: string) => {
  const { data } = await sanityFetch({
    query: POST_BY_ID_QUERY,
    params: { postId },
  });
  return data;
});

export const getPosts = cache(
  async (
    limit: number = 12,
    offset: number = 0,
    tagFilter?: string | string[],
    statusFilter: string = "publish",
    searchQuery?: string
  ): Promise<PostWithExpandedCategories[]> => {
    let filterClause = "";
    const params: any = { limit, offset };

    // Handle text search in title and content
    if (searchQuery && searchQuery.trim()) {
      filterClause += `&& (title match $searchQuery || content match $searchQuery) `;
      params.searchQuery = `*${searchQuery.trim()}*`;
    }

    // Handle tag filter (single or multiple)
    if (tagFilter) {
      if (Array.isArray(tagFilter)) {
        if (tagFilter.length > 0) {
          filterClause += "&& count(tags[@._ref in $tagFilter]) > 0 ";
          params.tagFilter = tagFilter;
        }
      } else if (tagFilter !== "all") {
        filterClause += "&& $tagFilter in tags[]._ref ";
        params.tagFilter = tagFilter;
      }
    }

    // Handle status filter
    if (statusFilter && statusFilter !== "all") {
      filterClause += "&& status == $statusFilter ";
      params.statusFilter = statusFilter;
    }

    const queryPostById =
      defineQuery(`*[_type == "post" && !(_id in path("drafts.**")) ${filterClause}] | order(date desc, sticky desc)[$offset...($offset + $limit)] {
      _id,
      title,
      slug,
      date,
      status,
      excerpt,
      content,
      featuredMedia,
      categories[]->{
        _id,
        name,
        slug
      },
      tags[]->{
        _id,
        name,
        slug
      }
    }`);

    const { data } = await sanityFetch({
      query: queryPostById,
      params,
    });
    return (data as PostWithExpandedCategories[]) || [];
  }
);

export const getLatestPosts = cache(async (limit: number = 3) => {
  return getPosts(limit, 0, undefined, "publish");
});

export const getNextPosts = cache(async (limit: number = 3, offset: number = 3) => {
  return getPosts(limit, offset, undefined, "publish");
});

export const getTotalPostsCount = cache(
  async (
    tagFilter?: string | string[],
    statusFilter: string = "publish",
    searchQuery?: string
  ): Promise<number> => {
    let filterClause = "";
    const params: any = {};

    // Handle text search in title and content
    if (searchQuery && searchQuery.trim()) {
      filterClause += `&& (title match $searchQuery || content match $searchQuery) `;
      params.searchQuery = `*${searchQuery.trim()}*`;
    }

    // Handle tag filter (single or multiple)
    if (tagFilter) {
      if (Array.isArray(tagFilter)) {
        if (tagFilter.length > 0) {
          filterClause += "&& count(tags[@._ref in $tagFilter]) > 0 ";
          params.tagFilter = tagFilter;
        }
      } else if (tagFilter !== "all") {
        filterClause += "&& $tagFilter in tags[]._ref ";
        params.tagFilter = tagFilter;
      }
    }

    // Handle status filter
    if (statusFilter && statusFilter !== "all") {
      filterClause += "&& status == $statusFilter ";
      params.statusFilter = statusFilter;
    }

    const queryTotalPostsCount = defineQuery(
      `count(*[_type == "post" && !(_id in path("drafts.**")) ${filterClause}])`
    );

    const { data } = await sanityFetch({
      query: queryTotalPostsCount,
      params,
    });
    return (data as number) || 0;
  }
);

export const getAllTags = cache(async () => {
  const queryAllTags = defineQuery(`*[_type == "tag"] | order(name asc) {
      _id,
      name,
      slug
    }`);
  const { data } = await sanityFetch({
    query: queryAllTags,
  });
  return data || [];
});

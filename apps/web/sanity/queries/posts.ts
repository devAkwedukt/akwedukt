import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { cache } from "react";

export const POST_BY_ID_QUERY = defineQuery(`*[_id == $postId][0]{
  _id,
  title,
  slug,
  date,
  modified,
  status,
  content,
  excerpt,
  featuredMedia,
  sticky,
  author->{
    _id,
    name,
    slug
  },
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
  ) => {
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

    const { data } = await sanityFetch({
      query: `*[_type == "post" && !(_id in path("drafts.**")) ${filterClause}] | order(date desc, sticky desc)[$offset...($offset + $limit)] {
      _id,
      title,
      slug,
      date,
      status,
      excerpt,
      content,
      featuredMedia,
      sticky,
      author->{
        _id,
        name,
        slug
      },
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
    }`,
      params,
    });
    return data || [];
  }
);

export const getLatestPosts = cache(async (limit: number = 3) => {
  return getPosts(limit, 0, undefined, "publish");
});

export const getNextPosts = cache(async (limit: number = 3, offset: number = 3) => {
  return getPosts(limit, offset, undefined, "publish");
});

export const getTotalPostsCount = cache(
  async (tagFilter?: string | string[], statusFilter: string = "publish", searchQuery?: string) => {
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

    const { data } = await sanityFetch({
      query: `count(*[_type == "post" && !(_id in path("drafts.**")) ${filterClause}])`,
      params,
    });
    return data || 0;
  }
);

export const getAllCategories = cache(async () => {
  const { data } = await sanityFetch({
    query: `*[_type == "category"] | order(name asc) {
      _id,
      name,
      slug
    }`,
  });
  return data || [];
});
export const getAllTags = cache(async () => {
  const { data } = await sanityFetch({
    query: `*[_type == "tag"] | order(name asc) {
      _id,
      name,
      slug
    }`,
  });
  return data || [];
});

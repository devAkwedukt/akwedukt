import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { cache } from "react";

export const PROJECT_BY_ID_QUERY = defineQuery(`*[_id == $projectId][0]{
  _id,
  title,
  slug,
  mainImage,
  shortDescription,
  startDate,
  projectTypes,
  projectStatus,
  sections
}`);

export const getProjectById = cache(async (projectId: string) => {
  const { data } = await sanityFetch({
    query: PROJECT_BY_ID_QUERY,
    params: { projectId },
  });
  return data;
});

export const getProjects = cache(
  async (limit: number, projectFilter?: string, statusFilter?: string) => {
    let filterClause = "";
    const params: any = { limit };

    // Handle projectType filter
    if (projectFilter && projectFilter !== "all") {
      filterClause += "&& projectTypes == $projectFilter ";
      params.projectFilter = projectFilter;
    }

    // Handle projectStatus filter
    if (statusFilter && statusFilter !== "all") {
      filterClause += "&& projectStatus == $statusFilter ";
      params.statusFilter = statusFilter;
    }

    const { data } = await sanityFetch({
      query: `*[_type == "project" && !(_id in path("drafts.**")) ${filterClause}] | order(startDate desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      shortDescription,
      startDate,
      projectTypes,
      projectStatus
    }`,
      params,
    });
    return data || [];
  }
);

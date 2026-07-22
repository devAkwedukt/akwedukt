import { defineQuery } from "next-sanity";
import { sanityFetchProduction } from "../live";
import { cache } from "react";

export const PROJECT_BY_ID_QUERY = defineQuery(`*[_id == $projectId][0]{
  _id,
  title,
  slug,
  mainImage,
  shortDescription,
  projectTypes,
  projectStatus,
  sections
}`);

export const getProjectById = cache(async (projectId: string) => {
  const { data } = await sanityFetchProduction({
    query: PROJECT_BY_ID_QUERY,
    params: { projectId },
  });
  return data;
});

export const getProjects = cache(
  async (
    limit: number,
    offset: number = 0,
    projectFilter?: string,
    statusFilter?: string
  ): Promise<any[]> => {
    let filterClause = "";
    const params: any = { limit, offset };

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

    const queryProjects = `*[_type == "project" && !(_id in path("drafts.**")) ${filterClause}][$offset...($offset + $limit)] {
      _id,
      title,
      slug,
      mainImage,
      shortDescription,
      projectTypes,
      projectStatus
    }`;

    const { data } = await sanityFetchProduction({
      query: queryProjects,
      params,
    });
    return (data as any[]) || [];
  }
);

export const getTotalProjectsCount = cache(
  async (projectFilter?: string, statusFilter?: string): Promise<number> => {
    let filterClause = "";
    const params: any = {};

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

    const queryTotalProjectsCount = defineQuery(
      `count(*[_type == "project" && !(_id in path("drafts.**")) ${filterClause}])`
    );

    const { data } = await sanityFetchProduction({
      query: queryTotalProjectsCount,
      params,
    });
    return (data as number) || 0;
  }
);

import { getProjectById, getProjects } from "@/sanity/queries/projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { Button } from "@/components/ui/Button";
import type { ProjectsGallerySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";
import ProjectsGalleryDecoration from "./ProjectsGalleryDecoration";

interface ProjectsGalleryWrapperProps {
  item: ProjectsGallerySection;
}

//PROJEKTY (POLSKIE I MIĘDZYNARODOWE)
export default async function ProjectsGalleryWrapper({ item }: ProjectsGalleryWrapperProps) {
  let validProjects;

  // If projects are manually selected, use them
  if (item.projects && item.projects.length > 0) {
    const projectIds = item.projects.map((p) => p._ref).filter(Boolean);
    validProjects = await Promise.all(
      projectIds.map(async (projectId: string) => {
        return await getProjectById(projectId);
      })
    );
  } else {
    // Otherwise, load projects automatically based on filters
    validProjects = await getProjects(item.limit ?? 3, 0, item.projectFilter, item.statusFilter);
  }

  const filteredProjects = validProjects.filter(Boolean);

  return (
    <div className="relative">
      <section className="py-8 md:py-14 2xl:py-20 px-6 md:px-20 bg-blue-50 mx-auto relative">
        {item.title && (
          <h2 className="font-bold heading-2 text-left md:text-center mb-4">{item.title}</h2>
        )}
        {item.subtitle && (
          <p className="text-base md:text-lg text-left md:text-center">{item.subtitle}</p>
        )}

        <ProjectsGrid projects={filteredProjects} ctaText={item.ctaText} />

        {item.seeAllProjectsText && item.seeAllProjectsUrl && (
          <div className="mt-14 flex justify-start md:justify-center">
            <Button
              as="link"
              href={item.seeAllProjectsUrl}
              variant={item.ctaVariant || "primary"}
              size="large"
              className="min-h-15"
            >
              {item.seeAllProjectsText}
            </Button>
          </div>
        )}
      </section>

      {item.decorationVariant && (
        <ProjectsGalleryDecoration
          variant={item.decorationVariant}
          decorationImages={item.decorationImages}
        />
      )}
    </div>
  );
}

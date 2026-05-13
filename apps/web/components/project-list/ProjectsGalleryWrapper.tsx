import { getProjectById, getProjects } from "@/sanity/queries/projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { Button } from "@/components/ui/Button";
import type { ProjectsGallerySection } from "@/sanity/typegen";

interface ProjectsGalleryWrapperProps {
  item: ProjectsGallerySection;
}

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
    validProjects = await getProjects(item.limit ?? 3, item.projectFilter, item.statusFilter);
  }

  const filteredProjects = validProjects.filter(Boolean);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {item.title && <h2 className="text-3xl font-bold text-center mb-4">{item.title}</h2>}
        {item.subtitle && <p className="text-lg text-gray-600 text-center mb-8">{item.subtitle}</p>}
        <ProjectsGrid projects={filteredProjects} ctaText={item.ctaText} />
        {item.seeAllProjectsText && item.seeAllProjectsUrl && (
          <div className="text-center mt-8">
            <Button
              as="link"
              href={item.seeAllProjectsUrl}
              variant={item.ctaVariant || "primary"}
              size="medium"
            >
              {item.seeAllProjectsText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

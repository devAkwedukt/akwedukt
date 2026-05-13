import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Project } from "@/sanity/typegen";

interface ProjectsGridProps {
  projects: Project[];
  ctaText?: string;
}

export function ProjectsGrid({ projects, ctaText = "Dowiedz się więcej" }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-6 flex-wrap">
      {projects.map((project) => (
        <div
          key={project._id}
          className=" md:w-1/3 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col">
            {project.mainImage && (
              <div className="">
                <SanityImage
                  image={project.mainImage}
                  className="w-full h-48 md:h-full object-cover"
                  alt={project.title || ""}
                />
              </div>
            )}
            <div className="p-6">
              {project.startDate && (
                <div className="text-sm text-gray-500">
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
              )}
              <h3 className="heading-3 text-blue-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3">{project.shortDescription}</p>
              <div className="m-auto">
                <Button
                  as="link"
                  href={`/project/${project.slug?.current}`}
                  variant="link"
                  size="small"
                  rightIcon="arrow-right-alt"
                >
                  {ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

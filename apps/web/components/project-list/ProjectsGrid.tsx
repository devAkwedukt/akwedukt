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
    <main className="flex flex-row justify-between gap-8 mt-12 items-stretch">
      {projects.map((project) => (
        <div key={project._id} className="max-w-125 w-1/3 overflow-hidden flex">
          <div className="flex flex-col h-full w-full">
            {/* IMAGE OF PROJECT */}
            {project.mainImage && (
              <div className="">
                <SanityImage
                  image={project.mainImage}
                  className="w-full h-90 object-cover"
                  alt={project.title || ""}
                />
              </div>
            )}

            {/* TEXT CONTENT OF PROJECT */}
            <div className="pt-6 flex flex-col grow">
              {project.startDate && (
                <div className="text-md">{new Date(project.startDate).toLocaleDateString()}</div>
              )}
              <h3 className="heading-3 text-blue-900 mb-2">{project.title}</h3>
              <p className="mb-6 text-balance leading-relaxed">{project.shortDescription}</p>

              <Button
                as="link"
                href={`/project/${project.slug?.current}`}
                variant="link"
                size="medium"
                rightIcon="arrow-right-alt"
                className="pl-0 mt-auto"
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

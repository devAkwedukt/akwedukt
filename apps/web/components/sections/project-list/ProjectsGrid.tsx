import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Project } from "@/sanity/typegen";
import Link from "next/link";

interface ProjectsGridProps {
  projects: Project[];
  ctaText?: string;
}

export function ProjectsGrid({ projects, ctaText = "Dowiedz się więcej" }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <main className="max-w-480 mx-auto flex flex-col md:flex-row justify-between gap-8 mt-8 md:mt-12 items-stretch">
      {projects.map((project) => (
        <div key={project._id} className="group max-w-125 w-full md:w-1/3 flex">
          <div className="flex flex-col h-full w-full">
            {/* IMAGE OF PROJECT */}
            {project.mainImage && (
              <div className="overflow-hidden">
                <SanityImage
                  image={project.mainImage}
                  className="w-full h-75 object-cover 2xl:h-90 group-hover:scale-104 transition-transform duration-400 delay-20 will-change-transform"
                  alt={project.title || ""}
                />
              </div>
            )}

            {/* TEXT CONTENT OF PROJECT */}
            <div className="pt-6 flex flex-col grow">
              {project.startDate && (
                <div className="text-md">{new Date(project.startDate).toLocaleDateString()}</div>
              )}
              <Link href={`/project/${project.slug?.current}`} className="heading-3 mb-2 w-fit">
                {project.title}
              </Link>
              <p className="mb-6 leading-relaxed text-balance">{project.shortDescription}</p>

              <Button
                as="link"
                href={`/project/${project.slug?.current}`}
                variant="link"
                size="medium"
                rightIcon="arrow-right-alt"
                className="mt-auto"
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

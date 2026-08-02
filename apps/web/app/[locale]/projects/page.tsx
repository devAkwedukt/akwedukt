import { getProjects, getTotalProjectsCount } from "@/sanity/queries/projects";
import { ProjectsGrid } from "@/components/sections/project-list/ProjectsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const PROJECTS_PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projekty",
    description: "Przeglądaj wszystkie nasze zakończone projekty",
  };
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(locale);
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);

  const offset = (currentPage - 1) * PROJECTS_PER_PAGE;

  const [projects, totalCount] = await Promise.all([
    getProjects(PROJECTS_PER_PAGE, offset, undefined, "completed"),
    getTotalProjectsCount(undefined, "completed"),
  ]);

  const totalPages = Math.ceil(totalCount / PROJECTS_PER_PAGE);
  const filteredProjects = (projects as any[]).filter(Boolean);

  return (
    <section className="max-w-480 mx-auto px-6 md:px-20 bg-gray-50">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Co robimy", href: `/${locale}/co-robimy` },
          { label: "Zakończone projekty" },
        ]}
        className="px-0!"
      />

      <header className="text-center mb-12 pt-16 relative">
        <h1 className="heading-1 mb-6">Zakończone projekty</h1>
        <p className="text-lg">Przegląd zrealizowanych działań.</p>

        <Image
          src="/postsDoodle.svg"
          alt="doodle"
          height="200"
          width="300"
          className="hidden md:flex absolute right-1/12 top-0"
        />
      </header>

      {filteredProjects.length > 0 ? (
        <>
          <ProjectsGrid projects={filteredProjects} />

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/projects" />

          {/* Results count */}
          <p className="text-center pt-14 pb-18">
            Pokazano {filteredProjects.length} z {totalCount} projektów
          </p>
        </>
      ) : (
        <div className="text-center py-14">
          <h2 className="heading-2 mb-4">Nie znaleziono projektów</h2>
          <p className="text-lg">Nie znaleziono zakończonych projektów.</p>
        </div>
      )}
    </section>
  );
}

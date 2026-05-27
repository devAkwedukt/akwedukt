import { getProjects, getTotalProjectsCount } from "@/sanity/queries/projects";
import { ProjectsGrid } from "@/components/sections/project-list/ProjectsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { setRequestLocale } from "next-intl/server";

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
  const filteredProjects = projects.filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Co robimy", href: `/${locale}/co-robimy` },
          { label: "Zakończone projekty" },
        ]}
      />
      <header className="text-center mb-12">
        <h1 className="heading-1 mb-4">Zakończone projekty</h1>
        <p className="text-lg text-gray-600">Przegląd zrealizowanych działań.</p>
      </header>

      {filteredProjects.length > 0 ? (
        <>
          <ProjectsGrid projects={filteredProjects} />

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/projects" />

          {/* Results count */}
          <div className="text-center mt-8 text-gray-600">
            Pokazano {filteredProjects.length} z {totalCount} projektów
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="heading-2 mb-4">Nie znaleziono projektów</h2>
          <p className="text-gray-600">Nie znaleziono zakończonych projektów.</p>
        </div>
      )}
    </div>
  );
}

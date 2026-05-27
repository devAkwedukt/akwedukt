import { SanitySections } from "@/sanity/sections/SanitySections";
import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import type { Project } from "@/sanity/typegen";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

// GROQD Query builders
const projectSlugs = q.star
  .filterByType("project")
  .project((sub) => ({ slug: sub.field("slug.current") }));

const project = q
  .parameters<{ slug: string }>()
  .star.filterByType("project")
  .filterBy("slug.current == $slug")
  .slice(0);

/** Next doesn't know what slugs exist -> we can inform it so it can pre-generate all projects
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectSlugs.query,
    perspective: "published",
    stega: false,
  });
  return projectSlugs.parse(data); // [{ slug: example-slug }, ...]
}

/** This allows us to overwrite specific metadata fields from the parent (e.g. title, description)
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // since slug is unique per language we don't need locale here
  const { data } = await sanityFetch({
    query: project.query,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  const parsedProject = project.parse(data) as Project | null;
  if (!parsedProject) {
    return {};
  }

  return mapMetadata(parsedProject);
}

/** This page renders projects dynamically based on the slug in the URL path */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  setRequestLocale(locale); // Enables static rendering

  const { data } = await sanityFetch({ query: project.query, params: { slug } });
  const p = project.parse(data) as Project | null;
  if (!p) notFound();

  return (
    <main className="w-full">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Co robimy", href: `/${locale}/co-robimy` },
          { label: p.title || "Projekt" },
        ]}
      />
      <SanitySections value={p.sections} />
      <ContactForm />
    </main>
  );
}

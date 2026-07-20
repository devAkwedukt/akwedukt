import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Co nowego | Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function CoNowego({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const coNowego = q
    .parameters<{ locale: string }>()
    .star.filterByType("coNowego")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({ query: coNowego.query, params: { locale } });
  if (!data) notFound();
  const page = coNowego.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Co nowego" }]}
      />
      <SanitySections value={page?.sections} />
    </>
  );
}

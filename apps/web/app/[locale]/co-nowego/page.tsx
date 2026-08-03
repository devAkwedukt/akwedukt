import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";

const coNowego = q
  .parameters<{ locale: string }>()
  .star.filterByType("coNowego")
  .filterBy("locale == $locale")
  .slice(0);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await sanityFetchProduction({
    query: coNowego.query,
    params: { locale },
    perspective: "published",
    stega: false,
    cache: "settings",
  });
  return mapMetadata(coNowego.parse(data));
}

export const revalidate = 21600;

export default async function CoNowego({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { data } = await sanityFetchProduction({
    query: coNowego.query,
    params: { locale },
    cache: [{ type: "page", name: "coNowego" }],
  });
  if (!data) notFound();
  const page = coNowego.parse(data);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Co nowego" }]}
        className="bg-gray-50 w-full"
      />
      <SanitySections value={page?.sections} />
    </>
  );
}

import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";

const dlaInstytucji = q
  .parameters<{ locale: string }>()
  .star.filterByType("dlaInstytucji")
  .filterBy("locale == $locale")
  .slice(0);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await sanityFetchProduction({
    query: dlaInstytucji.query,
    params: { locale },
    perspective: "published",
    stega: false,
    cache: "settings",
  });
  return mapMetadata(dlaInstytucji.parse(data));
}

export const revalidate = 21600;

export default async function DlaInstytucji({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { data } = await sanityFetchProduction({
    query: dlaInstytucji.query,
    params: { locale },
    cache: [{ type: "page", name: "dlaInstytucji" }],
  });
  if (!data) notFound();
  const page = dlaInstytucji.parse(data);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Współpraca", href: `/${locale}/wspolpraca` },
          { label: "Dla instytucji" },
        ]}
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

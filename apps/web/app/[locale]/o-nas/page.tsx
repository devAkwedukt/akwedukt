import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import HeaderTest from "@/components/HeaderTest";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";

const oNasQuery = q
  .parameters<{ locale: string }>()
  .star.filterByType("oNas")
  .filterBy("locale == $locale")
  .slice(0);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await sanityFetchProduction({
    query: oNasQuery.query,
    params: { locale },
    perspective: "published",
    stega: false,
    cache: "settings",
  });
  return mapMetadata(oNasQuery.parse(data));
}

export default async function ONas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { data } = await sanityFetchProduction({
    query: oNasQuery.query,
    params: { locale },
    cache: [{ type: "page", name: "oNas" }],
  });
  if (!data) notFound();
  const page = oNasQuery.parse(data);

  return (
    <>
      {/*
        na Figmie brak - tymczasowo wyłączone
        <Breadcrumbs items={[{ label: "Strona główna", href: `/${locale}` }, { label: "O nas" }]} />
       */}
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

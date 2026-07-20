import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import HeaderTest from "@/components/HeaderTest";

export const metadata: Metadata = {
  title: "O nas | Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function ONas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const oNas = q
    .parameters<{ locale: string }>()
    .star.filterByType("oNas")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({
    query: oNas.query,
    params: { locale },
  });
  if (!data) notFound();
  const page = oNas.parse(data)[0];

  return (
    <>
      {/*
        na Figmie brak - tymczasowo wyłączone
        <Breadcrumbs items={[{ label: "Strona główna", href: `/${locale}` }, { label: "O nas" }]} />
       */}
      <HeaderTest
        headerText="Z lokalnych źródeł płyniemy w świat"
        subHeading="Odkrywaj z nami nowe możliwości"
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

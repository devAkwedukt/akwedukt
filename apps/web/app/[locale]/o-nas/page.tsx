import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";
import HeaderTest from "@/components/HeaderTest";

export const metadata: Metadata = {
  title: "O nas | Stowarzyszenie Akwedukt",
};

export default async function ONas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const oNas = q
    .parameters<{ locale: string }>()
    .star.filterByType("oNas")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: oNas.query, params: { locale } });
  if (!data) notFound();
  const page = oNas.parse(data)[0];

  return (
    <>
      {/*
        na Figmie brak - tymczasowo wyłączone
        <Breadcrumbs items={[{ label: "Strona główna", href: `/${locale}` }, { label: "O nas" }]} />
       */}
      <HeaderTest
        headerText="Lepsi razem - poznaj nasz zespół i misję"
        subHeading="Razem tworzymy przyszłość, w której każdy ma dostęp do wiedzy i możliwości rozwoju"
      />
      <SanitySections value={page?.sections} />
      <ContactForm />
    </>
  );
}

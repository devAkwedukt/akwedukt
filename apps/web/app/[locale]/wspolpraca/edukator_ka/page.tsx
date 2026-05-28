import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Edukator_ka | Stowarzyszenie Akwedukt",
};

export default async function Edukator_ka({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const edukator_ka = q
    .parameters<{ locale: string }>()
    .star.filterByType("edukator_ka")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: edukator_ka.query, params: { locale } });
  if (!data) notFound();
  const page = edukator_ka.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Współpraca", href: `/${locale}/wspolpraca` },
          { label: "Edukator_ka" },
        ]}
      />
      <SanitySections value={page?.sections} />
      <ContactForm />
    </>
  );
}

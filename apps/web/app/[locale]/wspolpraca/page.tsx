import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Współpraca | Stowarzyszenie Akwedukt",
};

export default async function Wspolpraca({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wspolpraca = q
    .parameters<{ locale: string }>()
    .star.filterByType("wspolpraca")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: wspolpraca.query, params: { locale } });
  if (!data) notFound();
  const page = wspolpraca.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Współpraca" }]}
        className="bg-gray-50 w-full"
      />
      <SanitySections value={page?.sections} />
      <ContactForm />
    </>
  );
}

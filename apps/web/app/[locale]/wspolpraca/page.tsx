import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Współpraca | Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function Wspolpraca({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wspolpraca = q
    .parameters<{ locale: string }>()
    .star.filterByType("wspolpraca")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({ query: wspolpraca.query, params: { locale } });
  if (!data) notFound();
  const page = wspolpraca.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Współpraca" }]}
        className="bg-gray-50 w-full"
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Wolontariat | Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function Wolontariat({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wolontariat = q
    .parameters<{ locale: string }>()
    .star.filterByType("wolontariat")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({
    query: wolontariat.query,
    params: { locale },
    cache: [{ type: "page", name: "wolontariat" }],
  });
  if (!data) notFound();
  const page = wolontariat.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Współpraca", href: `/${locale}/wspolpraca` },
          { label: "Wolontariat" },
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

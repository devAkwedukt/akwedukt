import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Polityka prywatności | Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const privacyPolicy = q
    .parameters<{ locale: string }>()
    .star.filterByType("privacyPolicy")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({ query: privacyPolicy.query, params: { locale } });
  if (!data) notFound();
  const page = privacyPolicy.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Polityka prywatności" }]}
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

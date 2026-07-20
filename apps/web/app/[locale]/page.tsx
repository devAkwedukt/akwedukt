import HeaderTest from "@/components/HeaderTest";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Stowarzyszenie Akwedukt",
};

export const revalidate = 21600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const home = q
    .parameters<{ locale: string }>()
    .star.filterByType("home")
    .filterBy("locale == $locale");

  const { data } = await sanityFetchProduction({ query: home.query, params: { locale } });
  if (!data) notFound();
  const h = home.parse(data)[0];

  return (
    <>
      {/* <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start"> */}
      <HeaderTest
        headerText="Jesteśmy nurtem, który niesie zmianę"
        subHeading="Pokonujemy bariery, dajemy energię i łączymy ze światem."
      />
      <SanitySections value={h?.sections} />
      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
      {/* </main>*/}
    </>
  );
}

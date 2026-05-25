import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";

export const metadata: Metadata = {
  title: "Wolontariuszy | Stowarzyszenie Akwedukt",
};

export default async function Wolontariuszy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wolontariuszy = q
    .parameters<{ locale: string }>()
    .star.filterByType("wolontariuszy")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: wolontariuszy.query, params: { locale } });
  if (!data) notFound();
  const page = wolontariuszy.parse(data)[0];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <div className="w-full flex flex-col gap-6">
          <SanitySections value={page?.sections} />
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

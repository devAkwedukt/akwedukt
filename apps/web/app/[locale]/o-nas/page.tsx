import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";

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
    <div className="flex items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <div className="w-full flex flex-col gap-6">
          <SanitySections value={page?.sections} />
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Wolontariat | Stowarzyszenie Akwedukt",
};

export default async function Wolontariat({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wolontariat = q
    .parameters<{ locale: string }>()
    .star.filterByType("wolontariat")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: wolontariat.query, params: { locale } });
  if (!data) notFound();
  const page = wolontariat.parse(data)[0];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <div className="w-full flex flex-col gap-6">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: `/${locale}` },
              { label: "Współpraca", href: `/${locale}/wspolpraca` },
              { label: "Wolontariat" },
            ]}
          />
          <SanitySections value={page?.sections} />
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

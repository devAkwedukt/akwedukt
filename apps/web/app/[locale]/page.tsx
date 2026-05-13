import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const home = q
    .parameters<{ locale: string }>()
    .star.filterByType("home")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: home.query, params: { locale } });
  if (!data) notFound();
  const h = home.parse(data)[0];

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <div className="w-full flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <SanitySections value={h?.sections} />
          <ContactForm />
        </div>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";

const volunteerWithUs = q
  .parameters<{ locale: string }>()
  .star.filterByType("volunteerWithUs")
  .filterBy("locale == $locale")
  .slice(0);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await sanityFetchProduction({
    query: volunteerWithUs.query,
    params: { locale },
    perspective: "published",
    stega: false,
    cache: "settings",
  });
  return mapMetadata(volunteerWithUs.parse(data));
}

export const revalidate = 21600;

export default async function VolunteerWithUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { data } = await sanityFetchProduction({
    query: volunteerWithUs.query,
    params: { locale },
    cache: [{ type: "page", name: "volunteerWithUs" }],
  });
  if (!data) notFound();
  const page = volunteerWithUs.parse(data);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Volunteer With Us" }]}
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Contact us"
        subHeadingText="Do you have a question, a problem, or a suggestion? Send us a message, and we will get back to you as soon as possible."
        /* pl || en */
        language="en"
      />
    </>
  );
}

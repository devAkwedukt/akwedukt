import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/reusable/contactForm/ContactForm";
import { Breadcrumbs } from "@/components/ui";

export default async function VolunteerWithUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const volunteerWithUs = q
    .parameters<{ locale: string }>()
    .star.filterByType("volunteerWithUs")
    .filterBy("locale == $locale");

  const { data } = await sanityFetch({ query: volunteerWithUs.query, params: { locale } });
  if (!data) notFound();
  const page = volunteerWithUs.parse(data)[0];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Strona główna", href: `/${locale}` }, { label: "Volunteer With Us" }]}
      />
      <SanitySections value={page?.sections} />
      <ContactForm
        headingText="Contact us"
        subHeadingText="Do you have a question, a problem or a suggestion? Send us a message and we’ll get back to you as soon as possible."
        language="en"
      />
    </>
  );
}

import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";
import { q } from "@/sanity/groqd";
import { sanityFetchProduction } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui";
import ImageSection from "@/components/reusable/ImageSection";
import ContactForm from "@/components/reusable/contactForm/ContactForm";

// QROQD Query builders
const postSlugs = q.star
  .filterByType("post")
  .project((sub) => ({ slug: sub.field("slug.current") }));

const post = q
  .parameters<{ slug: string }>()
  .star.filterByType("post")
  .filterBy("slug.current == $slug")
  .slice(0);

/** Next doesn't know what slugs exist -> we can inform it so it can pre-generate all posts
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export async function generateStaticParams() {
  const { data } = await sanityFetchProduction({
    query: postSlugs.query,
  });
  return postSlugs.parse(data); // [{ slug: example-slug }, ...]
}

/** This allows us to overwrite specific metadata fields from the parent (e.g. title, description)
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // since slug is unique per language we don't need locale here
  const { data } = await sanityFetchProduction({
    query: post.query,
    params: { slug },
    perspective: "published",
    stega: false,
    cache: "settings",
  });
  return mapMetadata(post.parse(data));
}

export const revalidate = 21600;

/** This page renders posts dynamically based on the slug in the URL path */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  setRequestLocale(locale); // Enables static rendering

  const { data } = await sanityFetchProduction({
    query: post.query,
    params: { slug },
    cache: [{ type: "post", slug }],
  });
  if (!data) notFound();
  const p = post.parse(data)!;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Kronika wydarzeń", href: `/${locale}/posts` },
          { label: p.title || "Post" },
        ]}
        className="w-full bg-gray-50"
      />

      <div className="bg-gray-50 w-full px-6 md:px-20 py-8 md:py-12 2xl:py-16">
        <main className="max-w-480 mx-auto flex flex-col md:flex-row gap-10 md:gap-16 2xl:gap-20 justify-start items-start ">
          <aside className="w-auto">
            <SanityImage
              className="w-full md:w-150 h-auto aspect-square object-cover"
              image={p.featuredMedia}
              width={600}
              height={300}
            />
          </aside>

          <article className="w-full md:w-1/2 flex flex-col pt-12 relative">
            {p.date && (
              <p className="text-sm md:text-base absolute top-0 right-0">
                {new Date(p.date).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
            <h2 className="heading-2 text-balance mb-8">{p.title}</h2>
            <div className="text-balance text-base md:text-lg">
              <SanityRichText value={p.content} withImageSlider={true} />
            </div>
          </article>
        </main>
      </div>
      <ImageSection item={{ _type: "imageSection", slider: p.slider, enabled: true }} />

      <ContactForm
        headingText="Napisz do nas"
        subHeadingText="Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe."
      />
    </>
  );
}

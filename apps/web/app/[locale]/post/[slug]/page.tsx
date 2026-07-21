import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";
import { q } from "@/sanity/groqd";
import { sanityFetch, sanityFetchProduction } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui";
import ImageSection from "@/components/reusable/ImageSection";

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
    cache: "posts",
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
    cache: { type: "post", slug },
    perspective: "published",
    stega: false,
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

  const { data } = await sanityFetchProduction({ query: post.query, params: { slug } });
  if (!data) notFound();
  const p = post.parse(data)!;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="w-full">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: `/${locale}` },
              { label: "Kronika wydarzeń", href: `/${locale}/posts` },
              { label: p.title || "Post" },
            ]}
          />
          <div className="flow-root">
            <SanityImage
              className="mb-4 w-full md:float-left md:mr-6 md:mb-4 md:w-80 h-auto rounded-lg"
              image={p.featuredMedia}
              mode="cover"
              width={600}
              height={300}
            />
            <div>
              {p.date && (
                <div>
                  {new Date(p.date).toLocaleDateString("pl-PL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
              <SanityRichText value={p.content} withImageSlider={true} />
            </div>
          </div>
          <ImageSection slider={p.slider} />
        </div>
      </main>
    </div>
  );
}

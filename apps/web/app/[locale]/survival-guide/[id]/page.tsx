import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { client } from "@/sanity/client";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

export const dynamic = "force-dynamic";

export default async function GuideArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await client.fetch(
    '*[_type == "survivalGuideEntry" && _id == $id && defined(title)][0]{title, body}',
    { id },
    { perspective: "published", stega: false, cache: "no-store" }
  );
  if (!entry) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/survival-guide"
        className="mx-auto block w-44 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-green-700 md:w-52"
      >
        <Image
          src="/survival-guide/light.webp"
          width={688}
          height={400}
          alt="Kwidzyn Survival Guide — back to all topics"
          className="h-auto w-full"
        />
      </Link>
      <Link href="/survival-guide" className="mt-6 inline-block underline underline-offset-4">
        ← All topics
      </Link>
      <article className="mt-6 min-w-0 space-y-5 rounded-2xl bg-gray-50/95 p-5 [overflow-wrap:anywhere] md:p-8">
        <h1 className="heading-2">{entry.title}</h1>
        <SanityRichText value={entry.body} />
      </article>
    </main>
  );
}

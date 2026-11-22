import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { client } from "@/sanity/client";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

export const dynamic = "force-dynamic";

export default async function GuideArticle({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const entry = await client.fetch(
    '*[_type == "survivalGuideEntry" && _id == $id && defined(title)][0]{title, body}',
    { id }, { perspective: "published", stega: false, cache: "no-store" }
  );
  if (!entry) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/survival-guide" className="underline">← Kwidzyn Survival Guide</Link>
      <article className="mt-8 space-y-5">
        <h1 className="heading-2">{entry.title}</h1>
        <SanityRichText value={entry.body} />
      </article>
    </main>
  );
}

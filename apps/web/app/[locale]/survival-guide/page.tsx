import Image from "next/image";
import { client } from "@/sanity/client";
import GuideList, { type GuideItem } from "./GuideList";

export const dynamic = "force-dynamic";

export default async function GuidePage() {
  const items = await client.fetch<GuideItem[]>(
    '*[_type == "survivalGuideEntry" && defined(title)] | order(coalesce(position, 100), title, _id){_id, title, keywords}',
    {}, { perspective: "published", stega: false, cache: "no-store" }
  );
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1><Image src="/survival-guide/light.webp" width={688} height={400} alt="Kwidzyn Survival Guide" className="mx-auto w-64" /></h1>
      <GuideList items={items} />
    </main>
  );
}

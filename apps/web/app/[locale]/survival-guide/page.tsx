import Image from "next/image";
import { client } from "@/sanity/client";
import GuideList, { type GuideItem } from "./GuideList";

export const dynamic = "force-dynamic";

export default async function GuidePage() {
  const items = await client.fetch<GuideItem[]>(
    '*[_type == "survivalGuideEntry" && defined(title)] | order(lower(title), _id){_id, title, keywords}',
    {},
    { perspective: "published", stega: false, cache: "no-store" }
  );
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <h1>
        <Image
          src="/survival-guide/light.webp"
          width={688}
          height={400}
          alt="Kwidzyn Survival Guide"
          className="mx-auto h-auto w-full max-w-sm md:max-w-md"
        />
      </h1>
      <div className="rounded-2xl bg-gray-50/95 p-5 md:p-8">
        <GuideList items={items} />
      </div>
    </main>
  );
}

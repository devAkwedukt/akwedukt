import type { AboutStatsSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function AboutStatsSection({ item }: { item: AboutStatsSection }) {
  if (!item.stats?.length) return null;

  return (
    <section className="w-full px-20 py-20 bg-deep-navy-blue-50 flex justify-start items-center gap-12">
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-150 aspect-square object-cover"
          width={600}
          height={600}
        />
      )}

      <article className="max-w-150 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {item.title && <h2 className="heading-2">{item.title}</h2>}
          {item.description && (
            <div className="body-lg text-balance">
              <SanityRichText value={item.description} />
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-6">
            {item.stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="heading-1">{stat.number}</h1>
                <div className="body-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

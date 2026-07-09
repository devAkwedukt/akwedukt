import type { AboutStatsSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function AboutStatsSection({ item }: { item: AboutStatsSection }) {
  if (!item.stats?.length) return null;

  return (
    <section className="w-full p-6 md:px-20 py-12 md:py-16 2xl:py-20 bg-deep-navy-blue-50">
      <main className="max-w-480 mx-auto flex flex-col-reverse md:flex-row justify-start items-center gap-12">
        {item.image && (
          <SanityImage
            image={item.image}
            className="size-80 md:size-150 aspect-square object-cover"
            width={600}
            height={600}
          />
        )}

        <article className="max-w-150 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {item.title && <h2 className="heading-2">{item.title}</h2>}
            {item.description && (
              <div className="body-base md:body-lg text-balance">
                <SanityRichText value={item.description} />
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-6">
              {item.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center md:justify-start items-center md:items-start gap-1 md:gap-2"
                >
                  <h1 className="heading-1">{stat.number}</h1>
                  <div className="body-lg text-center md:text-left text-balance">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </section>
  );
}

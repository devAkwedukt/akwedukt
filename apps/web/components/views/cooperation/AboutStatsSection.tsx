import type { AboutStatsSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function AboutStatsSection({ item }: { item: AboutStatsSection }) {
  if (!item.stats?.length) return null;

  return (
    <div className="w-full px-20 py-14 bg-deep-navy-blue-50 flex justify-between items-center gap-12">
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-[600px] object-cover"
          width={600}
          height={600}
        />
      )}
      <div className="flex flex-col gap-12">
        {item.title && (
          <h2 className="text-foreground text-[56px] font-bold font-serif leading-[59.36px]">
            {item.title}
          </h2>
        )}
        {item.description && <SanityRichText value={item.description} />}
        <div className="w-[600px] grid grid-cols-2 gap-6">
          {item.stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="text-foreground text-[56px] font-bold font-serif leading-[59.36px]">
                {stat.number}
              </div>
              <div className="text-foreground body-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

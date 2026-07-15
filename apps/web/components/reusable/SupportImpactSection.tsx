"use client";

import type { SupportImpactSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

interface SupportImpactSectionProps {
  item: SupportImpactSection;
}

const colorClasses = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  pink: "text-pink-600",
  orange: "text-orange-700",
};

export default function SupportImpactSection({ item }: SupportImpactSectionProps) {
  return (
    <section className="px-6 md:px-20 py-8 md:py-16 2xl:py-20 max-w-480">
      <main className="mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Image - left on desktop, last on mobile */}
        <aside className="size-80 md:size-150">
          {item?.image && (
            <SanityImage
              image={item.image}
              alt={item?.title || ""}
              width={600}
              height={600}
              className=" aspect-square w-full h-auto object-cover"
            />
          )}
        </aside>

        <article className="flex flex-col gap-8 md:gap-12 max-w-200">
          <div className="flex flex-col gap-8">
            <h2 className="heading-2">{item?.title}</h2>
            <p className="text-base md:text-lg leading-6 text-balance">{item?.description}</p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item?.cards?.map((card, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2
                  className={`heading-2 leading-10 ${
                    colorClasses[card?.color as keyof typeof colorClasses] || "text-blue-600"
                  }`}
                >
                  {card?.amount}
                </h2>
                <p className="text-base leading-6 text-balance">{card?.description}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
    </section>
  );
}

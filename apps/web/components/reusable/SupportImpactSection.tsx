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
  if (item.enabled === false) return null;

  return (
    <section className="relative px-6 md:px-20 py-10 md:py-16 2xl:py-20">
      <main className="mx-auto max-w-480 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Image - left on desktop, last on mobile */}
        <aside className="size-82.5 md:size-150">
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
            <p className="text-base md:text-lg text-balance">{item?.description}</p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item?.cards?.map((card, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2
                  className={`heading-2 ${
                    colorClasses[card?.color as keyof typeof colorClasses] || "text-blue-600"
                  }`}
                >
                  {card?.amount}
                </h2>
                <p className="text-base leading-normal text-balance">{card?.description}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
      {item.decorImage && (
        <SanityImage
          image={item.decorImage}
          className="absolute -top-1/15 md:top-0 -right-1/8 md:right-0 scale-55 md:scale-100"
        />
      )}
    </section>
  );
}

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
  orange: "text-orange-600",
};

export default function SupportImpactSection({ item }: SupportImpactSectionProps) {
  return (
    <section className="px-5 py-14 md:px-20">
      <div className="max-w-1280 mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Image - left on desktop, last on mobile */}
        <div className="flex-1 order-2 md:order-1">
          {item?.image && (
            <SanityImage
              image={item.image}
              alt={item?.title || ""}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        </div>

        {/* Content - right on desktop, first on mobile */}
        <div className="flex-1 flex flex-col gap-8 order-1 md:order-2">
          <div className="flex flex-col gap-6">
            <h3 className="text-deep-navy-blue-900 font-serif font-bold text-4xl leading-10">
              {item?.title}
            </h3>
            <p className="text-deep-navy-blue-900 text-base leading-6">{item?.description}</p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item?.cards?.map((card, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className={`text-4xl font-serif font-bold leading-10 ${
                    colorClasses[card?.color as keyof typeof colorClasses] || "text-blue-600"
                  }`}
                >
                  {card?.amount}
                </div>
                <p className="text-deep-navy-blue-900 text-base leading-6">{card?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { SanityImage } from "@/sanity/image/SanityImage";
import type { PartnersSection } from "@/sanity/typegen";

export default function PartnersSection({ item }: { item: PartnersSection }) {
  if (!item.enabled || !item.partners?.length) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          {/* Section Title */}
          {item.title && <h2 className="heading-2 text-center max-w-4xl">{item.title}</h2>}

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 w-full">
            {item.partners.map((partner) => (
              <a
                key={partner._key}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors duration-200 min-h-[120px] group"
              >
                {partner.logo && (
                  <SanityImage
                    image={partner.logo}
                    width={120}
                    height={60}
                    className="max-w-full max-h-[60px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                    alt={partner.name || "Partner logo"}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { SanityImage } from "@/sanity/image/SanityImage";
import type { PartnersSection } from "@/sanity/typegen";

//NASI PARTNERZY
export default function PartnersSection({ item }: { item: PartnersSection }) {
  if (!item.enabled || !item.partners?.length) return null;

  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="flex flex-col items-start gap-10">
        {/* Section Title */}
        {item.title && <h2 className="heading-2 px-20">{item.title}</h2>}

        {/* Partners Grid */}
        <div className="flex flex-row flex-wrap justify-center gap-16 w-full">
          {item.partners.map((partner) => (
            <a
              key={partner._key}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-auto h-auto"
            >
              {partner.logo && (
                <SanityImage
                  image={partner.logo}
                  width={125}
                  height={125}
                  className="w-auto h-auto max-h-25 object-contain select-none"
                  alt={partner.name || "Partner logo"}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

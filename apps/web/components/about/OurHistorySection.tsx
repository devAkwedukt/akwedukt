"use client";

import type { OurHistorySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function OurHistorySection({ item }: { item: OurHistorySection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {item.title && <h2 className="heading-2 text-neutral-900">{item.title}</h2>}
            {item.description && (
              <p className="body-large text-neutral-600 leading-relaxed">{item.description}</p>
            )}
          </div>

          {/* Image */}
          {item.image && (
            <div className="relative aspect-4/3 lg:aspect-square rounded-lg overflow-hidden">
              <SanityImage
                image={item.image}
                className="object-cover"
                alt={item.image.alt || item.title || "Zdjęcie sekcji Nasza historia"}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import type { WhoWeAreSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

//Akwedukt: Działamy dla Kwidzyna, otwieramy się na świat
export default function WhoWeAreSection({ item }: { item: WhoWeAreSection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full py-20 flex flex-row justify-start items-center gap-20">
      {/* Image */}
      {item.image && (
        <aside className="relative h-150 w-150 overflow-hidden">
          <SanityImage
            image={item.image}
            className="object-cover"
            alt={item.image.alt || item.title || "Zdjęcie sekcji Kim jesteśmy"}
          />
        </aside>
      )}

      {/* Text Content */}
      <article className="flex flex-col items-start gap-6 max-w-160">
        {item.title && <h2 className="heading-2">{item.title}</h2>}
        {item.description && (
          <p className="body-lg leading-normal text-balance">{item.description}</p>
        )}
      </article>
    </section>
  );
}

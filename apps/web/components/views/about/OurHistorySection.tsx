"use client";

import type { OurHistorySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

//MARZENIE O KWIDZYNIE BEZ GRANIC
export default function OurHistorySection({ item }: { item: OurHistorySection }) {
  if (!item.enabled) return null;

  return (
    <>
      <section className="w-full py-24 px-20 flex flex-row justify-start items-center gap-20 max-w-480 mx-auto bg-gray-50">
        {/* Text Content */}
        <article className="flex flex-col items-start gap-6 max-w-150">
          <p className="body-lg font-bold leading-relaxed">Nasza historia</p>
          {item.title && <h2 className="heading-2">{item.title}</h2>}
          {item.description && (
            <p className="body-lg leading-normal text-balance">{item.description}</p>
          )}
        </article>

        {/* Image */}
        {item.image && (
          <aside className="relative h-150 w-150 overflow-hidden">
            <SanityImage
              image={item.image}
              className="object-cover"
              alt={item.image.alt || item.title || "Zdjęcie sekcji Nasza historia"}
            />
          </aside>
        )}
      </section>
      {item.bottomImage && (
        <SanityImage
          image={item.bottomImage}
          className="w-full h-auto object-cover"
          width={1440}
          height={240}
        />
      )}
    </>
  );
}

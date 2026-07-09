"use client";

import type { OurHistorySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

//MARZENIE O KWIDZYNIE BEZ GRANIC
export default function OurHistorySection({ item }: { item: OurHistorySection }) {
  if (!item.enabled) return null;

  return (
    <>
      <section className="w-full py-12 md:py-16 2xl:py-24 px-6 md:px-20 mx-auto bg-gray-50">
        <main className="max-w-480 mx-auto flex flex-col md:flex-row justify-start gap-12 md:gap-16 2xl:gap-20 items-center">
          {/* Text Content */}
          <article className="flex flex-col items-start gap-6 max-w-150">
            <p className="body-lg font-bold leading-relaxed">Nasza historia</p>
            {item.title && <h2 className="heading-2">{item.title}</h2>}
            {item.description && (
              <p className="body-base md:body-lg leading-normal text-balance">{item.description}</p>
            )}
          </article>

          {/* Image */}
          {item.image && (
            <SanityImage
              image={item.image}
              className="object-cover size-80 md:size-150"
              alt={item.image.alt || item.title || "Zdjęcie sekcji Nasza historia"}
            />
          )}
        </main>{" "}
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

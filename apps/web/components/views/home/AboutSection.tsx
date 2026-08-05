"use client";

import type { AboutSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";
import { Button } from "@/components/ui/Button";

//KRÓTKO O AKWEDUKCIE
export default function AboutSection({ item }: { item: AboutSection }) {
  if (item.enabled === false) return null;

  return (
    <section className="max-w-480 px-6 md:px-20 3xl:px-20 py-8 md:py-16 2xl:py-24 flex flex-col-reverse md:flex-row justify-start items-center gap-10 md:gap-16 2xl:gap-18 mx-auto">
      <aside className="flex w-full h-auto md:w-150 md:h-150 relative">
        {/* Image */}
        {item.image && (
          <SanityImage
            image={item.image}
            className="object-cover aspect-square h-auto w-full"
            alt={item.image.alt || item.title || "Zdjęcie sekcji o Akwedukcie"}
          />
        )}
      </aside>

      {/* Text Content */}
      <article className="flex flex-col items-start justify-start gap-6 2xl:gap-7 max-w-170 relative">
        {item.title && <h2 className="heading-2 max-w-75 md:max-w-auto">{item.title}</h2>}
        {item.subtitle && (
          <p className="text-base md:text-lg md:leading-relaxed leading-normal text-balance">
            {item.subtitle}
          </p>
        )}
        {item.button && item.button.url && (
          <Button
            as="link"
            href={item.button.url}
            variant="link"
            size="large"
            rightIcon="arrow-right-alt"
            className="text-deep-navy-blue-700!"
          >
            {item.button.label}
          </Button>
        )}

        {/* SVG DOODLE ELEMENTS */}
        <div>
          {item.decorImage && (
            <SanityImage
              image={item.decorImage}
              className="absolute md:-bottom-1/4 md:left-1/2 right-0 bottom-0 md:scale-100 scale-50 w-24 h-23.25"
              width={96}
              height={93}
            />
          )}
          {item.decorImage2 && (
            <SanityImage
              image={item.decorImage2}
              className="absolute md:top-1/1 2xl:-right-1/12 md:right-0 right-1/12 translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 top-1/12 scale-50 md:scale-100 w-41.25 h-46.5"
              width={165}
              height={172}
            />
          )}
        </div>
      </article>
    </section>
  );
}

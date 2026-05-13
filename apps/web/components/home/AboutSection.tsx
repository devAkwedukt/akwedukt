"use client";

import type { AboutSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";
import { Button } from "@/components/ui/Button";

export default function AboutSection({ item }: { item: AboutSection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full py-16 lg:py-24">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          {item.image && (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <SanityImage
                image={item.image}
                className="object-cover"
                alt={item.image.alt || item.title || "Zdjęcie sekcji o Akwedukcie"}
              />
            </div>
          )}
          {/* Text Content */}
          <div className="space-y-6">
            {item.title && <h2 className="heading-2">{item.title}</h2>}
            {item.subtitle && <p className="body-large leading-relaxed">{item.subtitle}</p>}
            {item.button && item.button.url && (
              <Button
                className="px-0"
                as="link"
                href={item.button.url}
                variant="link"
                size="large"
                rightIcon="arrow-right-alt"
              >
                {item.button.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

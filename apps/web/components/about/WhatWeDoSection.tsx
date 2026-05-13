"use client";

import type { WhatWeDoSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { SliderDots } from "@/components/ui/SliderDots";
import { useSlider } from "@/hooks/useSlider";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

export default function WhatWeDoSection({ item }: { item: WhatWeDoSection }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } = useSlider();

  if (!item.enabled) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          {item.title && <h2 className="heading-2 text-neutral-900 mb-4">{item.title}</h2>}
          {item.subtitle && <p className="heading-3 text-neutral-700 mb-2">{item.subtitle}</p>}
          {item.subsubtitle && <p className="body-large text-neutral-600">{item.subsubtitle}</p>}
        </div>

        {/* Descriptions Grid */}
        {item.descriptions && item.descriptions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {item.descriptions.map((desc, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="body-medium text-neutral-700">
                  <SanityRichText value={desc.description} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Slider */}
        {item.slider && item.slider.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            {/* SLIDER VIEWPORT */}
            <div ref={emblaRef} className="w-full overflow-hidden">
              {/* SLIDER TRACK */}
              <div className="flex">
                {item.slider.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] aspect-16/9 rounded-lg overflow-hidden"
                  >
                    <SanityImage
                      image={slide.image}
                      className="object-cover w-full h-full"
                      alt={slide.image?.alt || `Zdjęcie ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {item.slider.length > 1 && (
              <>
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
                  <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="left" />
                  <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="right" />
                </div>
                <SliderDots
                  count={scrollSnaps.length}
                  selectedIndex={selectedIndex}
                  onSelect={scrollTo}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

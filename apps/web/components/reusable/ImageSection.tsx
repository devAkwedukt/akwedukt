"use client";
import { SanityImage } from "@/sanity/image/SanityImage";
import { SliderDots } from "@/components/ui/SliderDots";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { useSlider } from "@/hooks/useSlider";
import type { WhatWeDoSection } from "@/sanity/typegen";

export default function ImageSection({ slider }: { slider: WhatWeDoSection["slider"] }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } = useSlider();

  return (
    <section className="relative w-full py-12 xl:py-16 2xl:py-26 px-6 md:px-20 bg-gray-50 mx-auto">
      {/* Image Slider */}
      {slider && slider.length > 0 && (
        <main className="max-w-480 mx-auto w-full py-8 md:py-14 flex flex-col items-center gap-6">
          {/* Photo slider */}
          <div ref={emblaRef} className="w-full overflow-hidden">
            <div className="flex gap-6">
              {slider.map((slide, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] aspect-16/9 overflow-hidden max-h-[70vh] active:cursor-grabbing"
                >
                  <SanityImage
                    image={slide.image}
                    className="object-cover w-full h-full object-center"
                    alt={slide.image?.alt || `Zdjęcie ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          {slider.length > 1 && (
            <div className="w-full flex justify-between items-center">
              <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="left" />
              <SliderDots
                count={scrollSnaps.length}
                selectedIndex={selectedIndex}
                onSelect={scrollTo}
              />
              <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="right" />
            </div>
          )}

          {/* Caption */}
          {slider[selectedIndex]?.image?.alt && (
            <div className="w-full max-w-full md:max-w-250 md:px-20 text-center">
              <p className="body-base md:text-lg text-balance">{slider[selectedIndex].image.alt}</p>
            </div>
          )}
        </main>
      )}
    </section>
  );
}

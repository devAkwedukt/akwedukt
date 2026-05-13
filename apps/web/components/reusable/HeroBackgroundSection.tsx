"use client";

import { Button } from "@/components/ui/Button";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { SliderDots } from "@/components/ui/SliderDots";
import { useSlider } from "@/hooks/useSlider";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { HeroBackgroundSection } from "@/sanity/typegen";

export default function HeroBackgroundSection({ item }: { item: HeroBackgroundSection }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } = useSlider();

  if (!item?.enabled || !item?.slides?.length) return null;

  return (
    <section className="relative w-full h-screen min-h-150 overflow-hidden">
      {/* SLIDER VIEWPORT */}
      <div ref={emblaRef} className="w-full h-full">
        {/* SLIDER TRACK */}
        <div className="flex h-full">
          {item.slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] relative">
              {/* BACKGROUND IMAGE */}
              {slide.backgroundImage && (
                <div className="absolute inset-0 z-0">
                  <SanityImage
                    image={slide.backgroundImage}
                    className="object-contain w-full h-full"
                    alt={slide.title || "Hero background image"}
                  />
                  {/* Optional overlay for better text readability */}
                  <div className="absolute inset-0" />
                </div>
              )}

              {/* CONTENT */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container text-center">
                  <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                    {slide.title && <h1 className="heading-1">{slide.title}</h1>}

                    {slide.description && (
                      <p className="body-lg-bold max-w-2xl">{slide.description}</p>
                    )}

                    {slide.button?.label && slide.button?.url && (
                      <Button
                        as="link"
                        href={slide.button.url}
                        variant="primary"
                        size="large"
                        className="mt-4"
                      >
                        {slide.button.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION */}
      {item.slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="left" />
          <SliderDots
            count={scrollSnaps.length}
            selectedIndex={selectedIndex}
            onSelect={scrollTo}
          />
          <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="right" />
        </div>
      )}
    </section>
  );
}

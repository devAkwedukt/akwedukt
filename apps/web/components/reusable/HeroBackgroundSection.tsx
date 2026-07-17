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
    <header className="relative w-full min-h-140 overflow-hidden">
      {/* SLIDER VIEWPORT */}
      <div ref={emblaRef} className="w-full h-full">
        {/* SLIDER TRACK */}
        <div className="flex h-full">
          {item.slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] relative">
              {/* BACKGROUND IMAGE */}
              {slide.backgroundImage && (
                <div className="absolute z-0 hidden md:block">
                  <SanityImage
                    image={slide.backgroundImage}
                    className="object-cover w-full h-full"
                    alt={slide.title || "Hero background image"}
                  />
                  {/* Optional overlay for better text readability */}
                  <div className="absolute inset-0" />
                </div>
              )}
              {slide.backgroundImageMob && (
                <div className="absolute z-0 md:hidden">
                  <SanityImage
                    image={slide.backgroundImageMob}
                    className="object-cover w-full h-full"
                    alt={slide.title || "Hero background image"}
                  />
                  {/* Optional overlay for better text readability */}
                  <div className="absolute inset-0" />
                </div>
              )}

              {/* CONTENT */}
              <div className="relative z-10 flex items-center justify-center mt-14 h-full">
                <div className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-8 text-center">
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
                      className="mt-4 min-h-16 py-5"
                    >
                      {slide.button.label}
                    </Button>
                  )}
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
    </header>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { SliderDots } from "@/components/ui/SliderDots";
import { useSlider } from "@/hooks/useSlider";
import { AnimatedImage } from "./AnimatedImage";
import type { HeroSlide } from "@/sanity/typegen";

type Slide = HeroSlide;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } = useSlider();

  if (!slides?.length) return null;

  return (
    <section className="w-full py-8 lg:py-14 bg-neutral-50 relative overflow-clip overflow-y-visible">
      {/* SLIDER VIEWPORT */}
      <div ref={emblaRef} className="w-full overflow-y-visible">
        {/* SLIDER TRACK */}
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] overflow-y-visible">
              {/* ANIMATED IMAGES - positioned within each slide */}
              {slide.animatedImages?.map((imageData, animIndex) => (
                <AnimatedImage key={animIndex} imageData={imageData} index={animIndex} />
              ))}

              {/* CONTENT */}
              <div className="container flex justify-start lg:justify-center md:items-center relative z-10">
                <div className="w-full flex flex-col md:items-center gap-8 md:gap-12 lg:gap-18">
                  <div className="w-full flex flex-col md:items-center gap-4 md:gap-6 lg:gap-8">
                    {slide.title && (
                      <h1 className="heading-1 max-w-[810px] md:text-center">{slide.title}</h1>
                    )}

                    {slide.description && <p className="body-lg-bold">{slide.description}</p>}
                  </div>

                  {slide.button?.label && slide.button?.url && (
                    <Button as="link" href={slide.button.url} variant="primary" size="large">
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
      {slides?.length > 1 && (
        <div className="container flex items-center justify-between mt-16 lg:mt-20">
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

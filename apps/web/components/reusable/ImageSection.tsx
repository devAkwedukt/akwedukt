"use client";
import { SanityImage } from "@/sanity/image/SanityImage";
import { SliderDots } from "@/components/ui/SliderDots";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { useSlider } from "@/hooks/useSlider";
import type { ImageSection } from "@/sanity/typegen";

export default function ImageSection({ item }: { item: ImageSection }) {
  const slidesPerView = item.sliderType === "mini" ? { sm: 1, md: 2, lg: 3 } : undefined;

  const slideWidthClass =
    item.sliderType === "mini"
      ? "flex-[0_0_calc(100%-1.5rem)] md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-0.5rem)]"
      : "flex-[0_0_100%]";

  const {
    emblaRef,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useSlider({ slidesPerView });

  if (item.enabled === false) return null;

  return (
    <section className="relative w-full py-10 xl:py-12 2xl:py-16 px-6 md:px-20 bg-gray-50 mx-auto">
      {/* Image Slider */}
      {item.slider && item.slider.length > 0 && (
        <main className="max-w-480 mx-auto w-full flex flex-col items-center gap-2 md:gap-4 3xl:gap-6">
          {/* Photo slider */}
          <div ref={emblaRef} className="w-full overflow-hidden">
            <div className="flex gap-6">
              {item.slider.map((slide, index) => (
                <div
                  key={index}
                  className={`${slideWidthClass} aspect-16/9 overflow-hidden max-h-[80vh] active:cursor-grabbing`}
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
          {item.slider.length > 1 && (canScrollPrev || canScrollNext) && (
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
          {item.slider[selectedIndex]?.image?.alt && (
            <div className="w-full max-w-full md:max-w-250 md:px-20 text-center">
              <p className="body-base md:text-lg text-balance">
                {item.slider[selectedIndex].image.alt}
              </p>
            </div>
          )}
        </main>
      )}
    </section>
  );
}

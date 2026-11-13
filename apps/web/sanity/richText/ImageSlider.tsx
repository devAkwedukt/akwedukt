"use client";

import { SanityImage } from "@/sanity/image/SanityImage";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { SliderDots } from "@/components/ui/SliderDots";
import { useSlider } from "@/hooks/useSlider";

type ImageSlide = {
  _type: "image" | "externalImage";
  asset?: any;
  url?: string;
  alt?: string;
};

type SliderType = "normal" | "mini";

interface ImageSliderProps {
  images: ImageSlide[];
  sliderType?: SliderType;
}

export function ImageSlider({ images, sliderType = "normal" }: ImageSliderProps) {
  const isMini = sliderType === "mini";
  const slidesPerView = isMini ? { sm: 1, md: 2, lg: 3 } : undefined;

  const slideWidthClass = isMini
    ? "flex-[0_0_calc(100%-1.5rem)] md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-0.5rem)]"
    : "flex-[0_0_100%]";

  const slideClass = isMini
    ? `${slideWidthClass} flex min-w-0 items-start justify-center overflow-hidden active:cursor-grabbing`
    : `${slideWidthClass} aspect-video max-h-200 min-h-60 min-w-80 w-auto overflow-hidden active:cursor-grabbing`;

  const sanityImageClass = isMini
    ? "block h-auto max-h-[420px] w-auto max-w-full object-contain object-top"
    : "object-cover min-h-60 w-full h-full object-center";

  const externalImageClass = isMini
    ? "block h-auto max-h-[420px] w-auto max-w-full object-contain object-top"
    : "object-cover w-full h-full object-center";

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

  if (!images?.length) return null;

  return (
    <div
      className={`${isMini ? "max-w-[1200px]" : "max-w-480"} mx-auto w-full py-8 md:py-12 flex flex-col items-center gap-4`}
    >
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex gap-6">
          {images.map((image, index) => (
            <div key={index} className={slideClass}>
              {image._type === "image" ? (
                <SanityImage image={image} className={sanityImageClass} />
              ) : (
                <img src={image.url} alt={image.alt || ""} className={externalImageClass} />
              )}
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (canScrollPrev || canScrollNext) && (
        <div className="w-full flex items-center justify-between">
          <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="left" />
          <SliderDots
            count={scrollSnaps.length}
            selectedIndex={selectedIndex}
            onSelect={scrollTo}
          />
          <SliderArrows onPrev={scrollPrev} onNext={scrollNext} position="right" />
        </div>
      )}
    </div>
  );
}

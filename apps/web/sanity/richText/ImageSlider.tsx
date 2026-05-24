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

export function ImageSlider({ images }: { images: ImageSlide[] }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } = useSlider();

  if (!images?.length) return null;

  return (
    <div className="mt-8">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <div className="flex justify-center max-h-[75dvh] w-full">
                {image._type === "image" ? (
                  <SanityImage className="object-cover" image={image} />
                ) : (
                  <img src={image.url} alt={image.alt || ""} className="object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-between mt-4">
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

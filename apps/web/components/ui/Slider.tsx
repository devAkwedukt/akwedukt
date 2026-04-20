"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState, ReactNode } from "react";
import clsx from "clsx";

type SliderProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

export function Slider({
  children,
  options,
  showArrows = true,
  showDots = true,
  className,
}: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    update();

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  if (!children) return null;

  return (
    <section className={clsx("relative w-full overflow-hidden", className)}>
      {/* VIEWPORT */}
      <div ref={emblaRef} className="overflow-hidden w-full h-full">
        {/* TRACK */}
        <div className="flex h-full">{children}</div>
      </div>

      {/* ARROWS */}
      {showArrows && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white px-3 py-2 rounded"
          >
            ‹
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white px-3 py-2 rounded"
          >
            ›
          </button>
        </>
      )}

      {/* DOTS */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={clsx(
                "w-2.5 h-2.5 rounded-full transition",
                index === selectedIndex ? "bg-white" : "bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

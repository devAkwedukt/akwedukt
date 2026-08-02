"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type SlidesPerView =
  | number
  | {
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      "2xl"?: number;
    };

interface UseSliderOptions extends EmblaOptionsType {
  slidesPerView?: SlidesPerView;
}

function getBreakpoints(slidesPerView?: SlidesPerView) {
  if (!slidesPerView || typeof slidesPerView === "number") {
    return undefined;
  }

  const breakpoints: Record<string, EmblaOptionsType> = {};

  if (slidesPerView.sm !== undefined) {
    breakpoints["(min-width: 640px)"] = { slidesToScroll: slidesPerView.sm };
  }
  if (slidesPerView.md !== undefined) {
    breakpoints["(min-width: 768px)"] = { slidesToScroll: slidesPerView.md };
  }
  if (slidesPerView.lg !== undefined) {
    breakpoints["(min-width: 1024px)"] = { slidesToScroll: slidesPerView.lg };
  }
  if (slidesPerView.xl !== undefined) {
    breakpoints["(min-width: 1280px)"] = { slidesToScroll: slidesPerView.xl };
  }
  if (slidesPerView["2xl"] !== undefined) {
    breakpoints["(min-width: 1536px)"] = { slidesToScroll: slidesPerView["2xl"] };
  }

  return Object.keys(breakpoints).length > 0 ? breakpoints : undefined;
}

export function useSlider({ slidesPerView, ...options }: UseSliderOptions = {}) {
  const breakpoints = getBreakpoints(slidesPerView);
  const slidesToScroll = typeof slidesPerView === "number" ? slidesPerView : undefined;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll,
    breakpoints,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    update();

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    emblaApi.on("resize", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      emblaApi.off("resize", update);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  };
}

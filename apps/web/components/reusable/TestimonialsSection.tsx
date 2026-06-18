"use client";

import type { TestimonialsSection } from "@/sanity/typegen";
import { useCallback, useEffect, useRef, useState } from "react";
import { RenderIcon } from "../ui";
import { IconButton } from "../ui/IconButton";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function TestimonialsSection({ item }: { item: TestimonialsSection }) {
  const testimonials = item.testimonials ?? [];

  const testimonialsContainerRef = useRef<HTMLElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;

    const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
    if (maxScrollLeft <= 1) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    setCanScrollLeft(container.scrollLeft > 1);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
  }, []);

  const getScrollStep = useCallback(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return 0;

    const firstCard = container.querySelector<HTMLElement>("[data-testimonial-card]");
    if (!firstCard) return container.clientWidth * 0.8;

    const styles = window.getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const safeGap = Number.isNaN(gap) ? 0 : gap;

    return firstCard.getBoundingClientRect().width + safeGap;
  }, []);

  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const container = testimonialsContainerRef.current;
      if (!container) return;

      const step = getScrollStep();
      if (step <= 0) return;

      container.scrollBy({
        left: direction === "right" ? step : -step,
        behavior: "smooth",
      });
    },
    [getScrollStep]
  );

  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;

    const frameId = window.requestAnimationFrame(updateScrollState);
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(frameId);
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [testimonials.length, updateScrollState]);

  if (!item.enabled || testimonials.length === 0) return null;

  return (
    <>
      <section className="bg-blue-50 w-full px-20 py-16 pb-32 2xl:py-22 2xl:pb-32 relative">
        <div className="flex flex-row items-start justify-start gap-14 max-w-480 mx-auto">
          {/* Section Title and Subtitle */}
          <aside className="flex flex-col gap-8">
            {item.title && <h2 className="heading-2 text-nowrap">{item.title}</h2>}
            {item.subtitle && <p className="body-lg text-nowrap">{item.subtitle}</p>}
            {item.bottomImage && (
              <SanityImage
                image={item.bottomDoodle}
                className="translate-x-1/2 translate-y-full"
                width={149}
                height={124}
              />
            )}
          </aside>

          {/* Testimonials Slider */}
          <main
            ref={testimonialsContainerRef}
            className="flex flex-row gap-8 flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._key}
                data-testimonial-card
                className="bg-gray-50 p-6 min-w-85 2xl:min-w-90 2xl:min-h-90  snap-start"
              >
                <h2 className="heading-2 text-deep-navy-blue-900/80 leading-none">“</h2>
                {/* Testimonial Text */}
                <blockquote className="mt-0 mb-4">
                  <p className="text-lg leading-relaxed text-balance">{testimonial.text}</p>
                </blockquote>

                {/* Author Info */}
                <div className="flex items-start flex-col">
                  <p className="font-bold text-lg leading-relaxed text-balance">
                    {testimonial.authorName}
                  </p>
                  <p className="text-base">{testimonial.authorRole}</p>
                </div>
              </div>
            ))}

            <div className="absolute right-20 bottom-10 flex flex-row gap-4">
              <IconButton
                icon="arrow-left-alt"
                shape="circle"
                size="large"
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleScroll("left");
                }}
                aria-label="Previous slide"
                disabled={!canScrollLeft}
              />
              <IconButton
                icon="arrow-right-alt"
                shape="circle"
                size="large"
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleScroll("right");
                }}
                aria-label="Next slide"
                disabled={!canScrollRight}
              />
            </div>
          </main>
        </div>
      </section>
      {item.bottomImage && (
        <SanityImage
          image={item.bottomImage}
          className="w-full h-auto object-cover"
          width={1440}
          height={290}
        />
      )}
    </>
  );
}

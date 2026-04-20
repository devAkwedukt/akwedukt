"use client";

import { SanityImage } from "@/sanity/image/SanityImage";
import { Slider } from "@/components/ui";

type Slide = {
  title?: string;
  description?: string;
  button?: {
    label?: string;
    url?: string;
  };
  image?: any;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  if (!slides?.length) return null;

  return (
    <Slider className="h-[80vh]">
      {slides.map((slide, index) => (
        <div key={index} className="flex-[0_0_100%] relative h-[80vh]">
          {/* IMAGE */}
          {slide.image && (
            <SanityImage
              image={slide.image}
              alt={slide.title ?? "hero image"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* CONTENT */}
          <div className="container absolute inset-0 z-20 flex items-center">
            <div className="max-w-xl text-white">
              {slide.title && (
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              )}

              {slide.description && (
                <p className="text-lg md:text-xl mb-6 opacity-90">{slide.description}</p>
              )}

              {slide.button?.label && slide.button?.url && (
                <a
                  href={slide.button.url}
                  className="inline-block rounded-xl bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition"
                >
                  {slide.button.label}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

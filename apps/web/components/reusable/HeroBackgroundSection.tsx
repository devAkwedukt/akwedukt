"use client";

import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { HeroBackgroundSection } from "@/sanity/typegen";

export default function HeroBackgroundSection({ item }: { item: HeroBackgroundSection }) {
  if (item.enabled === false || !item?.slides?.length) return null;

  return (
    <header className="w-full overflow-hidden bg-gray-50">
      <div className="flex">
        {item.slides.map((slide) => {
          const desktopImage = slide.backgroundImage ?? slide.backgroundImageMob;
          const mobileImage = slide.backgroundImageMob ?? slide.backgroundImage;

          return (
            <div
              key={slide._key}
              className="relative isolate grid flex-[0_0_100%] overflow-hidden bg-gray-50"
            >
              {desktopImage && (
                <SanityImage
                  image={desktopImage}
                  alt=""
                  aria-hidden="true"
                  sizes="100vw"
                  className="pointer-events-none col-start-1 row-start-1 hidden h-auto w-full self-stretch object-cover md:block"
                />
              )}

              {mobileImage && (
                <SanityImage
                  image={mobileImage}
                  alt=""
                  aria-hidden="true"
                  sizes="100vw"
                  className="pointer-events-none col-start-1 row-start-1 block h-auto w-full self-stretch object-cover md:hidden"
                />
              )}

              <div className="relative z-10 col-start-1 row-start-1 flex w-full flex-col justify-center">
                <div className="mx-auto flex w-full max-w-480 flex-col items-start gap-8 md:items-center md:gap-18 px-6">
                  <div className="mt-6 flex w-full max-w-200 flex-col gap-4 text-left md:items-center md:gap-8 md:text-center">
                    {slide.title && (
                      <h1 className="heading-1 text-balance md:text-wrap">{slide.title}</h1>
                    )}

                    {slide.description && (
                      <p className="text-lg 3xl:text-xl font-bold text-balance rotate-0.85">
                        {slide.description}
                      </p>
                    )}
                  </div>

                  {slide.button?.label && slide.button?.url && (
                    <Button
                      as="link"
                      href={slide.button.url}
                      variant="primary"
                      size="large"
                      className="min-h-auto md:min-h-16 py-5"
                    >
                      {slide.button.label}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}

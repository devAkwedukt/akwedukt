"use client";

import { SanityImage } from "@/sanity/image/SanityImage";
import { useSlider } from "@/hooks/useSlider";
import type { PartnersSection } from "@/sanity/typegen";

//NASI PARTNERZY
export default function PartnersSection({ item }: { item: PartnersSection }) {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo } = useSlider({
    slidesToScroll: 1,
    align: "start",
  });

  if (!item.enabled || !item.partners?.length) return null;

  return (
    <section className="w-full py-8 md:py-18 2xl:py-24 bg-gray-50">
      <div className="max-w-480 mx-auto flex flex-col items-start gap-4 md:gap-10">
        {/* Section Title */}
        {item.title && <h2 className="heading-2 px-6 md:px-20">{item.title}</h2>}

        {/* Mobile Slider */}
        <main className="md:hidden w-full px-6">
          <div className="" ref={emblaRef}>
            <div className="flex gap-8">
              {item.partners.map((partner) => (
                <div
                  key={partner._key}
                  className="flex-[0_0_calc(33.333%-20px)] min-w-0 flex items-center justify-center last-of-type:mr-8"
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-auto h-auto"
                  >
                    {partner.logo && (
                      <SanityImage
                        image={partner.logo}
                        width={125}
                        height={125}
                        className="w-auto h-auto max-h-20 object-contain select-none"
                        alt={partner.name || "Partner logo"}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-deep-navy-blue-900 w-6"
                    : "bg-deep-navy-blue-100 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </main>

        {/* Desktop Grid */}
        <main className="hidden md:flex flex-row flex-wrap justify-evenly gap-6 md:gap-14 2xl:gap-16 w-full">
          {item.partners.map((partner) => (
            <a
              key={partner._key}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-auto h-auto"
            >
              {partner.logo && (
                <SanityImage
                  image={partner.logo}
                  width={125}
                  height={125}
                  className="w-auto h-auto max-h-17.5 md:max-h-20 2xl:max-h-25 object-contain select-none"
                  alt={partner.name || "Partner logo"}
                />
              )}
            </a>
          ))}
        </main>
      </div>
    </section>
  );
}

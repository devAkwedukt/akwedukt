"use client";

import { useState, type TouchEvent } from "react";
import type { OurTeamSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function OurTeamSection({ item }: { item: OurTeamSection }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  if (item.enabled === false) return null;

  const employees = item.employees ?? [];
  const totalSlides = employees.length;
  const minSwipeDistance = 50;
  const slideGapPx = 24;

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  return (
    <section className="relative w-full px-6 md:px-20 py-12 md:py-16 2xl:py-24 bg-blue-50">
      {/* Header */}
      <header className="text-left md:text-center mb-8 md:mb-16 2xl:mb-20 flex flex-col gap-4">
        <p className="body-lg font-bold leading-relaxed">Nasz zespół</p>
        {item.title && <h2 className="heading-2 mb-2">{item.title}</h2>}
        {item.subtitle && <p className="text-base md:body-lg">{item.subtitle}</p>}
      </header>

      {item.decorImageMob && (
        <SanityImage
          image={item.decorImageMob}
          className="absolute z-20 -bottom-1/20 right-0 w-21.25 h-32 block md:hidden"
        />
      )}

      {/* MOBILE Grid */}
      {employees.length > 0 && (
        <div className="max-w-480 mx-auto">
          <main className="block md:hidden w-full overflow-x-hidden">
            <div
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex items-stretch gap-6 ease transition-transform duration-300"
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * slideGapPx}px))`,
                }}
              >
                {employees.map((employee, index) => (
                  <div
                    key={index}
                    className="flex w-full shrink-0 flex-col gap-4 justify-start items-start bg-gray-50 p-4 pb-4 md:pb-10"
                  >
                    {employee.photo && (
                      <div className="aspect-square w-full overflow-hidden">
                        <SanityImage
                          image={employee.photo}
                          className="object-cover w-full h-full"
                          alt={employee.photo.alt || employee.name || "Zdjęcie pracownika"}
                        />
                      </div>
                    )}

                    <div className="text-left">
                      <p className="text-lg font-bold text-balance">{employee.name}</p>
                      <p className="text-lg font-normal text-balance">{employee.position}</p>
                      {employee.bio && (
                        <p className="mt-4 text-base leading-normal text-balance">{employee.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3.25">
              {employees.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full p-1 transition-all duration-300 ease ${
                    index === currentIndex
                      ? "bg-deep-navy-blue-900 w-9"
                      : "bg-deep-navy-blue-100 w-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </main>

          {/* Desktop Grid */}
          <main className="hidden md:flex flex-row justify-start items-stretch gap-8 flex-wrap relative">
            {employees.map((employee, index) => (
              <div
                key={index}
                className="self-stretch flex flex-col  gap-4 justify-start items-start bg-gray-50 p-4 pb-10 w-full md:w-[calc((100%-4rem)/3)]"
              >
                {/* Employee Photo */}
                {employee.photo && (
                  <div className="aspect-square w-fit h-fit mx-auto overflow-hidden">
                    <SanityImage
                      image={employee.photo}
                      className="object-cover w-full h-full"
                      alt={employee.photo.alt || employee.name || "Zdjęcie pracownika"}
                    />
                  </div>
                )}

                {/* Employee Info */}
                <div className="text-left flex flex-col grow self-stretch items-stretch">
                  <div>
                    <p className="body-lg font-bold text-xl">{employee.name}</p>
                    <p className="body-lg font-normal text-xl text-balance">{employee.position}</p>
                  </div>

                  {employee.bio && (
                    <p className="mt-4 body-base 2xl:body-lg leading-relaxed text-balance">
                      {employee.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {item.decorImageAside && (
              <SanityImage
                image={item.decorImageAside}
                className="absolute -top-16 -left-1/20 w-23.25 h-22.75 hidden md:block"
              />
            )}
            {item.decorImageBottom && (
              <SanityImage
                image={item.decorImageBottom}
                className="absolute -bottom-16 -right-1/20 w-33.25 h-33.75 hidden md:block"
              />
            )}
          </main>
        </div>
      )}
    </section>
  );
}

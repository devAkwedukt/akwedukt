import React, { useState } from "react";

function MobileTestimonialsSlider({ testimonials }: { testimonials: any[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const totalSlides = testimonials.length;
  const minSwipeDistance = 50;
  const slideGapPx = 24; // value based on CSS gap between slides

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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
    <main className="md:hidden block relative w-full overflow-x-hidden">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-6 ease transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * slideGapPx}px))`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._key}
              data-testimonial-card
              className="md:hidden flex flex-col bg-gray-50 p-4 min-h-100 w-full min-w-full snap-proximity"
            >
              <h2 className="heading-2 text-deep-navy-blue-900/80 leading-none w-fit">“</h2>
              {/* Testimonial Text */}
              <blockquote className="mt-0 mb-4">
                <p className="text-base md:text-lg leading-relaxed text-balance">
                  {testimonial.text}
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="flex items-start flex-col">
                <p className="font-bold text-base md:text-lg leading-relaxed text-balance">
                  {testimonial.authorName}
                </p>
                <p className="text-base">{testimonial.authorRole}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3.25">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full p-1 transition-all duration-300 ease ${
              index === currentIndex ? "bg-deep-navy-blue-900 w-9" : "bg-deep-navy-blue-100 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
}

export default MobileTestimonialsSlider;

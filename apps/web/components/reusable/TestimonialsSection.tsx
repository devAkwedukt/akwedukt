"use client";

import type { TestimonialsSection } from "@/sanity/typegen";

export default function TestimonialsSection({ item }: { item: TestimonialsSection }) {
  if (!item.enabled || !item.testimonials?.length) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-neutral-50">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          {/* Section Title and Subtitle */}
          <div className="text-center max-w-4xl">
            {item.title && <h2 className="heading-2 mb-4">{item.title}</h2>}
            {item.subtitle && <p className="body-large text-neutral-600">{item.subtitle}</p>}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {item.testimonials.map((testimonial) => (
              <div
                key={testimonial._key}
                className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm"
              >
                {/* Testimonial Text */}
                <blockquote className="mb-4">
                  <p className="text-neutral-700 italic leading-relaxed">{testimonial.text}</p>
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900">{testimonial.authorName}</div>
                    <div className="text-sm text-neutral-600">{testimonial.authorRole}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

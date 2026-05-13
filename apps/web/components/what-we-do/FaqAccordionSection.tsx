"use client";

import { useState } from "react";
import type { FaqAccordionSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface FaqAccordionSectionProps {
  item: FaqAccordionSection;
}

export default function FaqAccordionSection({ item }: FaqAccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!item.title || !item.questions || item.questions.length === 0) {
    return null;
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#103770] text-3xl font-bold font-['Plus_Jakarta_Sans'] mb-4">
            {item.title}
          </h2>
          {item.subtitle && (
            <p className="text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed max-w-3xl mx-auto">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {item.questions.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c20a9a] focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[#103770] text-lg font-semibold font-['Plus_Jakarta_Sans'] pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-[#103770] transform transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                >
                  <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
                    <SanityRichText value={faq.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { FaqAccordionSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { RenderIcon } from "../ui";

interface FaqAccordionSectionProps {
  item: FaqAccordionSection;
}

const topBorderColors = [
  "border-purple-500",
  "border-yellow-500",
  "border-pink-300",
  "border-happy-green-600",
];

export default function FaqAccordionSection({ item }: FaqAccordionSectionProps) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  if (!item.title || !item.questions || item.questions.length === 0) {
    return null;
  }

  return (
    <section className="max-w-480 bg-gray-50 py-16 2xl:py-18 px-6 md:px-10 lg:px-20 mx-auto">
      <div className="mx-auto w-full max-w-300">
        <div className="mb-10 flex flex-col gap-6 text-center">
          <h2 className="heading-2">{item.title}</h2>
          {item.subtitle && <p className="mx-auto max-w-4xl text-lg">{item.subtitle}</p>}
        </div>

        <main className="mt-16 mx-auto w-full 2xl:max-w-300 max-w-225">
          {item.questions.map((faq, index) => {
            const isOpen = Boolean(openItems[index]);
            const contentId = `faq-answer-${faq._key ?? index}`;

            return (
              <div
                key={faq._key}
                className={`border-t-4 py-5 ${topBorderColors[index % topBorderColors.length]}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenItems((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                  className="group flex w-full items-start justify-between gap-6 text-left focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <h3 className="py-0.25 text-lg font-bold leading-relaxed cursor-pointer">
                    {faq.question}
                  </h3>

                  <RenderIcon
                    icon="arrow-down"
                    size={32}
                    className={`cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {faq.answer && (
                  <div
                    id={contentId}
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`max-w-[75ch] text-lg leading-relaxed text-balance transition-[transform,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen
                            ? "mt-3 translate-y-0 opacity-100"
                            : "mt-0 -translate-y-1 opacity-0"
                        }`}
                      >
                        <SanityRichText value={faq.answer} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
}

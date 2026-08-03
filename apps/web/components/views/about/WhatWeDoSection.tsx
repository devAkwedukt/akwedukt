"use client";

import type { WhatWeDoSection } from "@/sanity/typegen";
import { Fragment } from "react";
import ImageSection from "@/components/reusable/ImageSection";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function WhatWeDoSection({ item }: { item: WhatWeDoSection }) {
  if (item.enabled === false) return null;

  return (
    <section className="relative w-full py-8 xl:py-16 2xl:py-24 px-6 md:px-20 bg-gray-50 mx-auto">
      {/* Header */}
      <header className="max-w-480 mx-auto flex flex-row justify-between items-start mb-14">
        <article className="text-left flex flex-col max-w-165 md:max-w-250">
          <p className="text-base md:body-lg font-bold leading-relaxed">Co robimy</p>
          {item.title && <h2 className="heading-2 mt-4 mb-6 text-balance">{item.title}</h2>}
          {item.subtitle && <p className="text-base md:body-lg text-balance">{item.subtitle}</p>}
          {item.subsubtitle && <p className="text-base body-lg">{item.subsubtitle}</p>}
        </article>

        <aside className="absolute scale-50 md:scale-100 translate-x-1/2 right-1/6 md:right-1/5 top-1/7 md:top-1/30 z-0">
          {item.decorImageTop && (
            <SanityImage image={item.decorImageTop} className="w-110.5 h-69.75 hidden md:block" />
          )}
          {item.decorImageTopMob && (
            <SanityImage image={item.decorImageTopMob} className="w-110.5 h-69.75 md:hidden" />
          )}
        </aside>
      </header>

      {/* Descriptions Grid */}
      {item.descriptions && item.descriptions.length > 0 && (
        <main className="max-w-480 mx-auto flex flex-wrap justify-start items-start gap-8 md:gap-12 mb-12 relative">
          {item.descriptions.map((desc, index) => {
            const numberColorClasses = [
              "text-purple-500",
              "text-pink-500",
              "text-ocean-green-500",
              "text-happy-green-700",
              "text-orange-600",
            ];
            const numberColorClass = numberColorClasses[index] || "text-purple-500";

            return (
              <Fragment key={index}>
                <div className="w-full md:w-[calc((100%-6rem)/3)] flex flex-col gap-0 md:gap-4">
                  <div className="h-auto md:h-35 flex flex-col gap-4">
                    <span
                      className={`self-start text-4xl md:text-6xl font-bold font-serif ${numberColorClass}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {desc.heading && (
                      <h3 className="heading-3 leading-tight mb-4 md:mb-0">{desc.heading}</h3>
                    )}
                  </div>
                  {desc.description && (
                    <p className="text-base md:text-lg text-balance">{desc.description}</p>
                  )}
                  {desc.features && desc.features.length > 0 && (
                    <ul className="list-disc pl-5 flex flex-col gap-0 md:gap-2">
                      {desc.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-base md:text-lg text-balance">
                          {feature.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {item.decorImageBottom && (
                  <SanityImage
                    image={item.decorImageBottom}
                    className="absolute right-1/12 bottom-1/12 w-91.25 h-51.5 hidden md:block"
                  />
                )}
                {item.decorImageBottomMob && (
                  <SanityImage
                    image={item.decorImageBottomMob}
                    className="absolute right-1/8 bottom-0 translate-x-1/2 translate-y-1/2 w-91.25 h-51.5 md:hidden"
                  />
                )}
              </Fragment>
            );
          })}
        </main>
      )}
    </section>
  );
}

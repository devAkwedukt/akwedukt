"use client";

import type { ValuesSection } from "@/sanity/typegen";

//NASZE WARTOŚCI
export default function ValuesSection({ item }: { item: ValuesSection }) {
  if (!item.enabled) return null;

  return (
    <section className="max-w-480 w-full px-6 md:px-20 py-8 md:py-16 2xl:py-20 mx-auto">
      <div className="">
        {/* Section Title */}
        {item.title && (
          <div className="text-left md:text-center mb-12">
            <h2 className="heading-2 mb-4">{item.title}</h2>
          </div>
        )}

        {/* Values Grid */}
        {item.values && item.values.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between gap-12 2xl:gap-16">
            {item.values.map((value, index) => (
              <div
                key={index}
                className={`bg-ocean-green-200 p-3 md:p-5 w-full md:w-1/3 ${index === 1 && "bg-yellow-100"} ${index === 2 && "bg-pink-100"}`}
              >
                {value.title && <h3 className="heading-3 mb-4 tracking-tight">{value.title}</h3>}
                {value.subtitle && (
                  <p className="body-medium font-bold leading-relaxed">{value.subtitle}</p>
                )}
                {value.description && (
                  <p className="body-small leading-relaxed text-balance">{value.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

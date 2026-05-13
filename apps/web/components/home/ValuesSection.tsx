"use client";

import type { ValuesSection } from "@/sanity/typegen";

export default function ValuesSection({ item }: { item: ValuesSection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-neutral-50">
      <div className="container">
        {/* Section Title */}
        {item.title && (
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{item.title}</h2>
          </div>
        )}

        {/* Values Grid */}
        {item.values && item.values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {item.values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100"
              >
                {value.title && <h3 className="heading-3 text-neutral-900 mb-2">{value.title}</h3>}
                {value.subtitle && (
                  <p className="body-medium text-neutral-600 mb-3">{value.subtitle}</p>
                )}
                {value.description && (
                  <p className="body-small text-neutral-500 leading-relaxed">{value.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

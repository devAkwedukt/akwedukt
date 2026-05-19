"use client";

import type { OurTeamSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function OurTeamSection({ item }: { item: OurTeamSection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full px-20 py-24 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        {item.title && <h2 className="heading-2 mb-4">{item.title}</h2>}
        {item.subtitle && <p className="body-lg ">{item.subtitle}</p>}
      </div>

      {/* Employees Grid */}
      {item.employees && item.employees.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {item.employees.map((employee, index) => (
            <div key={index} className="text-center space-y-4">
              {/* Employee Photo */}
              {employee.photo && (
                <div className="relative aspect-square w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <SanityImage
                    image={employee.photo}
                    className="object-cover"
                    alt={employee.photo.alt || employee.name || "Zdjęcie pracownika"}
                  />
                </div>
              )}

              {/* Employee Info */}
              <div className="space-y-2">
                <h4 className="heading-4 font-semibold">{employee.name}</h4>
                <p className="body-small font-medium">{employee.position}</p>
                {employee.bio && <p className="body-small leading-relaxed">{employee.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import type { OurTeamSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function OurTeamSection({ item }: { item: OurTeamSection }) {
  if (!item.enabled) return null;

  return (
    <section className="w-full px-20 py-24 bg-blue-50">
      {/* Header */}
      <div className="text-center mb-20 flex flex-col gap-4">
        <p className="body-lg font-bold leading-relaxed">Nasz zespół</p>
        {item.title && <h2 className="heading-2 mb-2">{item.title}</h2>}
        {item.subtitle && <p className="body-lg">{item.subtitle}</p>}
      </div>

      {/* Employees Grid */}
      {item.employees && item.employees.length > 0 && (
        <div className="flex flex-row justify-between items-stretch gap-8 flex-wrap">
          {item.employees.map((employee, index) => (
            <div
              key={index}
              className="self-stretch flex flex-col gap-4 justify-start items-start bg-gray-50 p-4 pb-10 w-[calc(100%/3-32px)]"
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
              <div className="text-left">
                <p className="body-lg font-bold text-xl">{employee.name}</p>
                <p className="body-lg font-normal text-xl text-balance">{employee.position}</p>
                {employee.bio && (
                  <p className="mt-4 body-lg leading-relaxed text-balance">{employee.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

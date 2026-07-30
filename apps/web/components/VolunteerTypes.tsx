import type { VolunteerTypes } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

const sectionColorStyles = [
  {
    heading: "text-blue-700",
    itemBorders: ["border-blue-600", "border-blue-500", "border-blue-400"],
  },
  {
    heading: "text-pink-600",
    itemBorders: ["border-pink-500", "border-pink-400", "border-pink-300"],
  },
  {
    heading: "text-orange-700",
    itemBorders: ["border-orange-600", "border-orange-500", "border-orange-400"],
  },
] as const;

export default function VolunteerTypes({ item }: { item: VolunteerTypes }) {
  return (
    <section className="relative w-full px-6 md:px-15 2xl:px-20 py-8 md:py-16 2xl:py-20">
      <main className="max-w-480 mx-auto flex flex-col gap-20">
        <h2 className="heading-2  text-left md:text-center">{item.title}</h2>

        <div className="flex flex-col gap-8 md:gap-24">
          {item.sections?.map((section, sectionIndex) => {
            const colorStyle = sectionColorStyles[sectionIndex] ?? sectionColorStyles[0];

            return (
              <article key={section._key} className="flex flex-col md:flex-row gap-8">
                {/* Section Header with Number and Title */}
                <header className="flex flex-col gap-2 min-w-50 max-w-full md:max-w-50 translate-y-0 md:-translate-y-16">
                  {/* -translate-y-16 to adjust the alignment with the top of the items */}
                  <h3 className={`text-4xl md:text-6xl font-bold font-serif ${colorStyle.heading}`}>
                    {section.number}
                  </h3>
                  <p className="text-xl md:text-2xl leading-tight font-bold text-balance">
                    {section.title}
                  </p>
                </header>

                {/* 3 Items in row */}
                <div className="flex flex-col md:flex-row gap-8">
                  {section.items?.map((subItem, itemIndex) => (
                    <div
                      key={subItem._key}
                      className={`flex flex-col gap-4 w-full md:w-1/3 border-t-4 ${
                        colorStyle.itemBorders[itemIndex] ?? colorStyle.itemBorders[0]
                      }`}
                    >
                      <h4 className="pt-4 text-lg md:text-xl font-bold text-balance leading-relaxed">
                        {subItem.title}
                      </h4>
                      <p className="text-balance text-base leading-relaxed">
                        {subItem.description}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </main>
      {item.decorImage && (
        <SanityImage image={item.decorImage} className=" absolute bottom-0 right-0 w-110 h-70" />
      )}
    </section>
  );
}

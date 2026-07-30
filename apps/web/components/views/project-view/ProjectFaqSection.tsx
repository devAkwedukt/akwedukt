import type { ProjectFaqSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface ProjectFaqSectionProps {
  item: ProjectFaqSection;
}

export default function ProjectFaqSection({ item }: ProjectFaqSectionProps) {
  if (!item.items || item.items.length === 0 || item.enabled === false) {
    return null;
  }

  return (
    <section className="max-w-480 mx-auto py-8 md:py-14 2xl:py-20 px-6 md:px-20 3xl:px-0">
      {item.items.map((faqItem, index) => (
        <div key={index}>
          {index % 2 === 0 && index >= 0 && <hr className="border-deep-navy-blue-200 " />}
          {index % 2 === 0 && (
            <div className="grid md:grid-cols-2 gap-16">
              <div className="flex flex-row items-start gap-8 py-12 max-w-200">
                <span className="text-pink-500 text-3xl md:text-6xl font-bold font-serif">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-4">
                  <h3 className="heading-3 text-2xl">{faqItem.question}</h3>
                  <div className="text-base md:text-lg font-normal leading-relaxed text-balance">
                    <SanityRichText value={faqItem.answer} />
                  </div>
                </div>
              </div>

              {item.items && item.items[index + 1] && (
                <div className="flex flex-row items-start gap-8 py-12 max-w-200">
                  <span className="text-pink-500 text-3xl md:text-6xl font-bold font-serif">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-4">
                    <h3 className="heading-3 text-2xl">{item.items[index + 1].question}</h3>
                    <div className="text-base md:text-lg font-normal leading-relaxed text-balance">
                      <SanityRichText value={item.items[index + 1].answer} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

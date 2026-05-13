import type { ProjectFaqSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface ProjectFaqSectionProps {
  item: ProjectFaqSection;
}

export default function ProjectFaqSection({ item }: ProjectFaqSectionProps) {
  if (!item.items || item.items.length === 0) {
    return null;
  }

  return (
    <div className="container py-12">
      {item.items.map((faqItem, index) => (
        <div key={index}>
          {index % 2 === 0 && index > 0 && <hr className="border-[#c8daf3] mb-8" />}
          {index % 2 === 0 && (
            <div className="grid md:grid-cols-2 gap-x-8">
              <div className="pt-8">
                <div className="flex gap-4 mb-4">
                  <span className="text-pink-500 text-3xl font-bold font-['Fraunces']">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-[#103770] text-xl font-bold font-['Plus_Jakarta_Sans'] mb-3">
                  {faqItem.question}
                </h3>
                <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
                  <SanityRichText value={faqItem.answer} />
                </div>
              </div>
              {item.items && item.items[index + 1] && (
                <div className="pt-8">
                  <div className="flex gap-4 mb-4">
                    <span className="text-pink-500 text-3xl font-bold font-['Fraunces']">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[#103770] text-xl font-bold font-['Plus_Jakarta_Sans'] mb-3">
                    {item.items[index + 1].question}
                  </h3>
                  <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
                    <SanityRichText value={item.items[index + 1].answer} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

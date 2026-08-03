import type { ProjectQuestionsSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface ProjectQuestionsSectionProps {
  item: ProjectQuestionsSection;
}

export default function ProjectQuestionsSection({ item }: ProjectQuestionsSectionProps) {
  if (!item.questions || item.questions.length === 0 || item.enabled === false) {
    return null;
  }
  const getBackgroundClass = () => {
    switch (item.backgroundColor) {
      case "neutral-50":
        return "bg-neutral-50";
      case "deep-navy-blue-50":
        return "bg-deep-navy-blue-50";
      default:
        return "bg-white";
    }
  };
  return (
    <section className={`w-full py-8 md:py-14 2xl:py-20 px-6 md:px-20 ${getBackgroundClass()}`}>
      <header className="mb-8 max-w-480 mx-auto">
        {item.title && <h2 className="heading-2 text-4xl mb-4">{item.title}</h2>}
        {item.subtitle && <p className="text-xl font-normal">{item.subtitle}</p>}
      </header>

      <main className="max-w-480 mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-3 gap-12 md:gap-16">
        {item.questions.map((questionItem, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 text-center md:text-left bg-white p-4 md:p-6 min-h-75"
          >
            <h3 className="heading-3 text-2xl">{questionItem.question}</h3>
            <div className="text-base md:text-lg font-normal leading-relaxed text-balance">
              <SanityRichText value={questionItem.answer} />
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}

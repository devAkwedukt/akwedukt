import type { ProjectQuestionsSection } from "@/sanity/typegen";

interface ProjectQuestionsSectionProps {
  item: ProjectQuestionsSection;
}

export default function ProjectQuestionsSection({ item }: ProjectQuestionsSectionProps) {
  if (!item.questions || item.questions.length === 0) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        {item.title && (
          <h2 className="text-[#103770] text-4xl font-bold font-['Fraunces'] mb-4">{item.title}</h2>
        )}
        {item.subtitle && (
          <p className="text-[#103770] text-xl font-normal font-['Plus_Jakarta_Sans']">
            {item.subtitle}
          </p>
        )}
      </div>
      <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
        {item.questions.map((questionItem, index) => (
          <div key={index} className="text-center md:text-left">
            <h3 className="text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4">
              {questionItem.question}
            </h3>
            <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed whitespace-pre-wrap">
              {questionItem.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

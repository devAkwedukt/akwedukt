import { Button } from "@/components/ui/Button";
import type { ProjectSignupSection } from "@/sanity/typegen";

interface ProjectSignupSectionProps {
  item: ProjectSignupSection;
}

export default function ProjectSignupSection({ item }: ProjectSignupSectionProps) {
  if (!item.title || !item.buttonText || !item.buttonUrl) {
    return null;
  }

  return (
    <div className="w-full px-20 py-14 bg-[#f0f5fc] flex flex-col justify-center items-center gap-8">
      <div className="w-full max-w-[900px] flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h1 className="w-full text-center text-[#103770] text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
            {item.title}
          </h1>
        </div>
      </div>
      <Button as="link" href={item.buttonUrl!} variant="primary" size="medium">
        {item.buttonText}
      </Button>
    </div>
  );
}

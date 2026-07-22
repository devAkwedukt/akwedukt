import { Button } from "@/components/ui/Button";
import type { ProjectSignupSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

interface ProjectSignupSectionProps {
  item: ProjectSignupSection;
}

export default function ProjectSignupSection({ item }: ProjectSignupSectionProps) {
  if (!item.title || !item.buttonText || !item.buttonUrl) {
    return null;
  }

  return (
    <div className="relative overflow-hidden w-full px-20 py-14 bg-deep-navy-blue-900 flex flex-col justify-center items-center gap-8">
      {/* Background image */}
      <SanityImage
        image={item.decorImage}
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        width={1920}
        height={1080}
      />

      <SanityImage
        image={item.decorImageMob}
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
        width={768}
        height={1200}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-225 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h1 className="text-center text-white text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
            {item.title}
          </h1>
        </div>

        <Button as="link" href={item.buttonUrl!} variant="secondary" size="medium">
          {item.buttonText}
        </Button>
      </div>
    </div>
  );
}

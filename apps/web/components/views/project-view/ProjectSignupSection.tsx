import { Button } from "@/components/ui/Button";
import type { ProjectSignupSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

interface ProjectSignupSectionProps {
  item: ProjectSignupSection;
}

export default function ProjectSignupSection({ item }: ProjectSignupSectionProps) {
  if (!item.title || !item.buttonText || !item.buttonUrl || item.enabled === false) {
    return null;
  }

  return (
    <div className="relative overflow-hidden w-full px-6 md:px-20 py-12 md:py-14 2xl:py-18 bg-deep-navy-blue-900 flex flex-col justify-center items-center gap-8">
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
      <div className="relative z-10 w-full max-w-250 flex flex-col justify-center items-center gap-10">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="heading-2 text-center text-white text-balance">{item.title}</h2>
        </div>

        <Button as="link" href={item.buttonUrl!} variant="secondary" size="medium">
          {item.buttonText}
        </Button>
      </div>
    </div>
  );
}

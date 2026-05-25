import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { ProjectPhotoInfoSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface ProjectPhotoInfoSectionProps {
  item: ProjectPhotoInfoSection;
}

export default function ProjectPhotoInfoSection({ item }: ProjectPhotoInfoSectionProps) {
  if (!item.photo || !item.title || !item.description) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SanityImage image={item.photo} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h2 className="text-[#103770] text-3xl font-bold font-['Plus_Jakarta_Sans'] mb-4">
            {item.title}
          </h2>
          <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
            <SanityRichText value={item.description} />
          </div>
          {item.buttonText && item.buttonUrl && (
            <div className="mt-6">
              <Button
                as="link"
                href={item.buttonUrl}
                variant="secondary"
                rightIcon="arrow-right-alt"
              >
                {item.buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

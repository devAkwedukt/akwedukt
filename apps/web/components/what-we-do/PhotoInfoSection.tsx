import { SanityImage } from "@/sanity/image/SanityImage";
import { Button } from "@/components/ui/Button";
import type { PhotoInfoSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface PhotoInfoSectionProps {
  item: PhotoInfoSection;
}

export default function PhotoInfoSection({ item }: PhotoInfoSectionProps) {
  if (!item.title || !item.photo || !item.description || !item.button) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <div className="order-2 lg:order-1">
          <SanityImage
            image={item.photo}
            className="w-full h-auto rounded-lg shadow-lg"
            width={600}
            height={400}
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 space-y-6">
          <h2 className="text-[#103770] text-3xl font-bold font-['Plus_Jakarta_Sans']">
            {item.title}
          </h2>

          {/* Rich text description */}
          <div className="text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
            <SanityRichText value={item.description} />
          </div>

          {/* Button */}
          {item.button.url && item.button.text && (
            <div className="pt-4">
              <Button
                href={item.button.url}
                as="link"
                variant="link"
                size="large"
                rightIcon="arrow-right-alt"
              >
                {item.button.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

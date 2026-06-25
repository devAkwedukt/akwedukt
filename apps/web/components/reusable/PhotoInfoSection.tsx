import { SanityImage } from "@/sanity/image/SanityImage";
import { Button } from "@/components/ui/Button";
import type { PhotoInfoSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface PhotoInfoSectionProps {
  item: PhotoInfoSection;
}

export default function PhotoInfoSection({ item }: PhotoInfoSectionProps) {
  if (!item.title || !item.photo || !item.description) {
    return null;
  }

  return (
    <>
      <section className="py-16 2xl:py-20 px-20 bg-gray-50 mx-auto">
        <main className="max-w-480 mx-auto flex flex-row items-center gap-14">
          {/* Photo */}
          <aside className="max-w-150">
            <SanityImage
              image={item.photo}
              className="w-full h-auto aspect-square object-cover"
              width={600}
              height={600}
            />
          </aside>

          {/* Content */}
          <article className="relative flex flex-col gap-6 max-w-120 2xl:max-w-150">
            {item.decorImage && (
              <SanityImage
                image={item.decorImage}
                className="absolute -right-1/4 top-1/12"
                width={125}
                height={121}
              />
            )}

            <h2 className="heading-2">{item.title}</h2>

            {/* Rich text description */}
            <div className="text-lg">
              <SanityRichText value={item.description} />
            </div>

            {/* Button */}
            {item.button && item.button.url && item.button.text && (
              <Button
                href={item.button.url}
                as="link"
                variant="link"
                size="medium"
                rightIcon="arrow-right-alt"
                className="text-deep-navy-blue-700!"
              >
                {item.button.text}
              </Button>
            )}
          </article>
        </main>
      </section>

      {item.footerImage && (
        <SanityImage
          image={item.footerImage}
          className="w-full h-auto object-cover hidden md:block"
          width={1440}
          height={240}
        />
      )}
      {item.footerImageMob && (
        <SanityImage
          image={item.footerImageMob}
          className="w-full h-auto object-cover md:hidden"
          width={375}
          height={240}
        />
      )}
    </>
  );
}

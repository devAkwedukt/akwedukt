import { SanityImage } from "@/sanity/image/SanityImage";
import { Button } from "@/components/ui/Button";
import type { PhotoInfoSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { cn } from "@/lib/utils";

interface PhotoInfoSectionProps {
  item: PhotoInfoSection;
}

export default function PhotoInfoSection({ item }: PhotoInfoSectionProps) {
  if (!item.title || !item.photo || !item.description) {
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
    <>
      <section className={`py-12 md:py-16 2xl:py-20 px-6 md:px-20 ${getBackgroundClass()} mx-auto`}>
        <main className="max-w-480 mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-14">
          {/* Photo */}
          <aside
            className={cn(
              "max-w-150",
              item.imagePosition === "right" ? "md:order-2" : "md:order-1"
            )}
          >
            <SanityImage
              image={item.photo}
              className="w-full h-auto aspect-square object-cover"
              width={600}
              height={600}
            />
          </aside>

          {/* Content */}
          <article
            className={cn(
              "relative flex flex-col gap-6 max-w-120 2xl:max-w-150",
              item.imagePosition === "right" ? "md:order-1" : "md:order-2"
            )}
          >
            {item.decorImage && (
              <SanityImage
                image={item.decorImage}
                className="absolute -right-1/4 top-1/12 hidden md:flex"
                width={125}
                height={121}
              />
            )}

            <h2 className="heading-2">{item.title}</h2>

            {/* Rich text description */}
            <div className="text-base md:body-lg text-balance">
              <SanityRichText value={item.description} />
            </div>

            {/* Button */}
            {item.button && item.button.url && item.button.text && (
              <Button
                href={item.button.url}
                as="link"
                variant={item.button.ctaVariant || "link"}
                size="medium"
                rightIcon="arrow-right-alt"
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

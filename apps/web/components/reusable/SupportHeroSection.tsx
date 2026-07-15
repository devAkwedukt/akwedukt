import { SanityImage } from "@/sanity/image/SanityImage";
import type { SupportHeroSection } from "@/sanity/typegen";

interface SupportHeroSectionProps {
  item: SupportHeroSection;
}

export default function SupportHeroSection({ item }: SupportHeroSectionProps) {
  if (!item.title || !item.description) {
    return null;
  }

  return (
    <section className="max-w-480 px-6 py-8 md:py-16 2xl:py-20 md:px-15 2xl:px-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14">
      <article className="flex flex-col gap-6 max-w-175">
        <h1 className="heading-1">{item.title}</h1>
        <p className="text-lg">{item.description}</p>
      </article>

      {item.image && (
        <SanityImage
          image={item.image}
          className="hidden md:flex w-full max-w-150 object-contain"
        />
      )}
    </section>
  );
}

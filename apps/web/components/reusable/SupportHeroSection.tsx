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
    <section className="px-5 py-16 2xl:py-20 md:px-10 xl:px-20 flex items-center gap-8 md:gap-14">
      <article className="flex flex-col gap-6 max-w-150">
        <h2 className="heading-2 ">{item.title}</h2>
        <p className="text-lg">{item.description}</p>
      </article>

      {item.image && <SanityImage image={item.image} className="w-full max-w-150 object-contain" />}
    </section>
  );
}

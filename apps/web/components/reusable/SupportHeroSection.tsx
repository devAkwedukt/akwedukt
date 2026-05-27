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
    <section className="px-5 py-14 md:px-20 flex items-center gap-8 md:gap-14">
      <div className="flex flex-col gap-6 max-w-150">
        <h2 className="text-foreground font-serif font-bold text-4xl md:text-5xl leading-tight">
          {item.title}
        </h2>
        <p className="text-foreground text-lg leading-relaxed font-sans">{item.description}</p>
      </div>
      {item.image && <SanityImage image={item.image} className="w-full max-w-150 object-contain" />}
    </section>
  );
}

import type { PolicyDetailsSection } from "@/sanity/typegen";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";

type Props = {
  section: PolicyDetailsSection;
};

const numberColors = [
  "text-indigo-600",
  "text-lime-700",
  "text-teal-700",
  "text-fuchsia-700",
  "text-orange-700",
];

export default function PolicyDetailsSection({ section }: Props) {
  return (
    <section className="bg-neutral-50 py-14 xl:py-20">
      <div className="mx-auto container">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <h3 className="heading-3 text-primary">{section.title}</h3>

          <div className="max-w-2xl">
            <SanityRichText value={section.description} />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {section.cards?.map((card, index) => (
            <article key={card._key} className="flex flex-col gap-8">
              <span
                className={`font-fraunces text-5xl font-bold leading-none ${
                  numberColors[index % numberColors.length]
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <SanityRichText value={card.content} />
            </article>
          ))}
        </div>
      </div>
      {section.footerImage && (
        <SanityImage
          image={section.footerImage}
          className="w-full h-auto object-cover hidden md:block"
          width={1440}
          height={240}
        />
      )}
      {section.footerImageMob && (
        <SanityImage
          image={section.footerImageMob}
          className="w-full h-auto object-cover md:hidden"
          width={375}
          height={240}
        />
      )}
    </section>
  );
}

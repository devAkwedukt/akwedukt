import { SanityRichText } from "@/sanity/richText/SanityRichText";
import type { PolicySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function PolicySection({ item }: { item: PolicySection }) {
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
  if (item.enabled === false) return null;
  return (
    <section
      className={`relative mx-auto w-full py-14 md:py-20 px-6 md:px-20 flex justify-start items-start gap-10 ${getBackgroundClass()}`}
    >
      <main className="flex flex-col w-full gap-6 max-w-480 mx-auto">
        <h3 className="heading-3">{item.title}</h3>
        <div className="body-lg max-w-200 text-balance">
          <SanityRichText value={item.description} />
        </div>
      </main>

      <SanityImage
        image={item.decor}
        className="absolute -top-2.5 right-10 hidden md:block"
        width={60}
        height={60}
      />
    </section>
  );
}

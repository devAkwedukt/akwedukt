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
  return (
    <div
      className={`container relative py-14 flex justify-start items-start gap-10 ${getBackgroundClass()}`}
    >
      <div className="flex flex-col gap-6">
        <h3 className="heading-3">{item.title}</h3>
        <div className="body-lg">
          <SanityRichText value={item.description} />
        </div>
      </div>
      <SanityImage
        image={item.decor}
        className="absolute -top-2.5 right-10 hidden md:block"
        width={60}
        height={60}
      />
    </div>
  );
}

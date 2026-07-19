import { SanityRichText } from "@/sanity/richText/SanityRichText";
import type { ProjectTitleSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function ProjectTitleSection({ item }: { item: ProjectTitleSection }) {
  if (!item?.enabled) return null;

  return (
    <div className="container relative py-14 flex justify-start items-start gap-10">
      <div className="flex flex-col gap-6">
        <h2 className="heading-2">{item.title}</h2>
        <div className="body-lg">
          <SanityRichText value={item.description} />
        </div>
      </div>
      <SanityImage
        image={item.image}
        className="w-full h-auto max-h-92.5 aspect-square object-contain hidden md:block"
        width={600}
        height={400}
      />
      <SanityImage
        image={item.imageMob}
        className="absolute -top-2.5 right-0 md:hidden"
        width={60}
        height={60}
      />
    </div>
  );
}

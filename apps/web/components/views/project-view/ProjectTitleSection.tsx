import { SanityRichText } from "@/sanity/richText/SanityRichText";
import type { ProjectTitleSection } from "@/sanity/typegen";

export default function ProjectTitleSection({ item }: { item: ProjectTitleSection }) {
  if (!item?.enabled) return null;

  return (
    <div className="container py-14 flex flex-col justify-start items-start gap-6">
      <h2 className="w-186 heading-2">{item.title}</h2>
      <div className="w-186 body-lg">
        <SanityRichText value={item.description} />
      </div>
    </div>
  );
}

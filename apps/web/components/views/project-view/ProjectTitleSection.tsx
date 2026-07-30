import { SanityRichText } from "@/sanity/richText/SanityRichText";
import type { ProjectTitleSection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function ProjectTitleSection({ item }: { item: ProjectTitleSection }) {
  if (item.enabled === false) return null;

  return (
    <section className="max-w-480 mx-auto relative px-6 md:px-20 py-8 md:py-16 2xl:py-20 flex justify-center items-center gap-10 3xl:px-0">
      <aside className="flex flex-col gap-6">
        <h2 className="heading-2">{item.title}</h2>
        <div className="body-lg">
          <SanityRichText value={item.description} />
        </div>
      </aside>

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
    </section>
  );
}

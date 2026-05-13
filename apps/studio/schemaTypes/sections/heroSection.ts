import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enable Hero",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "heroSlide" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      const slideCount = slides?.length || 0;
      const firstSlide = slides?.[0];
      return {
        title: "Hero section",
        subtitle: `${slideCount} slide${slideCount !== 1 ? "s" : ""}`,
        media: firstSlide?.animatedImages?.[0]?.image,
      };
    },
  },
});

import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBackgroundSection",
  title: "Hero with Background Slider",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enable Hero Background",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "slides",
      title: "Background Slides",
      type: "array",
      of: [{ type: "heroBackgroundSlide" }],
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
        title: "Hero with Background Slider",
        subtitle: `${slideCount} slide${slideCount !== 1 ? "s" : ""}`,
        media: firstSlide?.backgroundImage,
      };
    },
  },
});

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
    prepare() {
      return {
        title: "Hero section",
      };
    },
  },
});

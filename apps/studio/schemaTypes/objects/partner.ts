import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        media: media,
      };
    },
  },
});

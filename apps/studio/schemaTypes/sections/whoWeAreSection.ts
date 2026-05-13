import { defineType, defineField } from "sanity";

export default defineType({
  name: "whoWeAreSection",
  title: "Kim jesteśmy",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Włącz sekcję",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Zdjęcie",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Opis alternatywny",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title, image }) {
      return {
        title: title || "Kim jesteśmy",
        subtitle: "Sekcja o nas",
        media: image,
      };
    },
  },
});

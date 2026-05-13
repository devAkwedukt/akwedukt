import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutSection",
  title: "Krótko o Akwedukcie",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Włącz sekcję o Akwedukcie",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł sekcji",
      type: "text",
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
    defineField({
      name: "button",
      title: "Przycisk",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Tekst przycisku",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "url",
          title: "URL przycisku",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
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
        title: title || "Krótko o Akwedukcie",
        subtitle: "Sekcja o Akwedukcie",
        media: image,
      };
    },
  },
});

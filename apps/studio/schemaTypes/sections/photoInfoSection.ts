import { defineField, defineType } from "sanity";

export default defineType({
  name: "photoInfoSection",
  title: "Sekcja zdjęcie z informacjami",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Zdjęcie",
      type: "img",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Przycisk",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "text",
          title: "Tekst przycisku",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL przycisku",
          type: "string",
          description: "Może być pełnym URL lub ścieżką wewnętrznej strony (np. '/o-nas')",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      photo: "photo",
    },
    prepare({ title, photo }) {
      return {
        title: title || "Sekcja zdjęcie z informacjami",
        subtitle: "Sekcja zdjęcie z informacjami",
        media: photo,
      };
    },
  },
});

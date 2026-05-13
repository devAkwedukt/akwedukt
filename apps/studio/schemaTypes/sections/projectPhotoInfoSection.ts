import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectPhotoInfoSection",
  title: "Sekcja z informacjami o projekcie (zdjęcie, tytuł, opis)",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "photo",
      title: "Zdjęcie",
      type: "img",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
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
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "buttonUrl",
      title: "URL przycisku",
      type: "string",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      photo: "photo",
    },
    prepare({ title, photo }) {
      return {
        title: title || "Sekcja z informacjami o projekcie",
        subtitle: "Zdjęcie, tytuł, opis",
        media: photo,
      };
    },
  },
});

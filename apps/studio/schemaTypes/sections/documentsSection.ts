import { defineType, defineField } from "sanity";

export default defineType({
  name: "documentsSection",
  title: "Dokumenty",
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
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
    }),
    defineField({
      name: "documents",
      title: "Dokumenty",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nazwa dokumentu",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis dokumentu",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "file",
              title: "Plik do pobrania",
              type: "file",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "buttonText",
              title: "Tekst przycisku",
              type: "string",
              initialValue: "Pobierz",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      documents: "documents",
    },
    prepare({ title, documents }) {
      const docCount = documents?.length || 0;
      return {
        title: title || "Dokumenty",
        subtitle: `${docCount} dokument${docCount !== 1 ? "y" : ""}`,
      };
    },
  },
});

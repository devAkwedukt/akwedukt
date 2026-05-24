import { defineType, defineField } from "sanity";

export default defineType({
  name: "valuesSection",
  title: "Sekcja Wartości",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Włącz sekcję wartości",
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
      name: "values",
      title: "Wartości",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł wartości",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Podtytuł wartości",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Opis wartości",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      values: "values",
    },
    prepare({ title, values }) {
      const valueCount = values?.length || 0;
      return {
        title: title || "Sekcja Wartości",
        subtitle: `${valueCount} ${valueCount === 1 ? "wartość" : "wartości"}`,
      };
    },
  },
});

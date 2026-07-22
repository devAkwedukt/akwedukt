import { defineType, defineField } from "sanity";

export default defineType({
  name: "infoSection",
  title: "Sekcja z informacjami",
  type: "object",
  fields: [
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
      name: "cards",
      title: "Karty",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł karty",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis karty",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare({ title, cards }) {
      return {
        title: title || "Sekcja z informacjami",
        subtitle: `${cards?.length || 0} kart`,
      };
    },
  },
});

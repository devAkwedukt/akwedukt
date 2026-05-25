import { defineType, defineField } from "sanity";

export default defineType({
  name: "cooperationModelsSection",
  title: "Sekcja modeli współpracy",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
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
          preview: {
            select: {
              title: "title",
            },
            prepare: ({ title }) => {
              return {
                title: title || "Karta",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.length(3).required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare: ({ title, cards }) => {
      return {
        title: title || "Sekcja modeli współpracy",
        subtitle: `${cards?.length || 0} kart`,
      };
    },
  },
});

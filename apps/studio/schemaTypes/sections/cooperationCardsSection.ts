import { defineType, defineField } from "sanity";

export default defineType({
  name: "cooperationCardsSection",
  title: "Sekcja kart współpracy",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
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
              title: "Opis",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "buttonText",
              title: "Tekst przycisku",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "buttonUrl",
              title: "URL przycisku",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).max(3).required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare({ title, cards }) {
      return {
        title: title || "Sekcja kart współpracy",
        subtitle: `${cards?.length || 0} kart`,
      };
    },
  },
});

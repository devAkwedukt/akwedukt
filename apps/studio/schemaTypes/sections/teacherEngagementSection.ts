import { defineType, defineField } from "sanity";

export default defineType({
  name: "teacherEngagementSection",
  title: "Sekcja zaangażowania nauczycieli",
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
    }),
    defineField({
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      initialValue: "Zobacz nasze projekty",
    }),
    defineField({
      name: "buttonUrl",
      title: "URL przycisku",
      type: "string",
    }),
    defineField({
      name: "bottomImage",
      title: "Styl: Obraz na dole",
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
      cards: "cards",
    },
    prepare({ title, cards }) {
      return {
        title: title || "Sekcja zaangażowania nauczycieli",
        subtitle: `${cards?.length || 0} kart`,
      };
    },
  },
});

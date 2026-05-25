import { defineType, defineField } from "sanity";

export default defineType({
  name: "teacherBenefitsSection",
  title: "Sekcja korzyści dla nauczycieli",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Obraz",
      type: "image",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.min(4).max(4).required(),
    }),
    defineField({
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      initialValue: "Skontaktuj się z nami",
    }),
    defineField({
      name: "buttonUrl",
      title: "URL przycisku",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare({ title, cards }) {
      return {
        title: title || "Sekcja korzyści dla nauczycieli",
        subtitle: `${cards?.length || 0} kart`,
      };
    },
  },
});

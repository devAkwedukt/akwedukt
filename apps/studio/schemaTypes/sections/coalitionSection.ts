import { defineType, defineField } from "sanity";

export default defineType({
  name: "coalitionSection",
  title: "Sekcja koalicji",
  type: "object",
  fields: [
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
      validation: (Rule) => Rule.length(4).required(),
    }),
    defineField({
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      initialValue: "Dowiedz się więcej",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonUrl",
      title: "URL przycisku",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare: ({ title, image }) => {
      return {
        title: title || "Sekcja koalicji",
        media: image,
      };
    },
  },
});

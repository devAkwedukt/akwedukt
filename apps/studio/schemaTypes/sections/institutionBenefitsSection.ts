import { defineType, defineField } from "sanity";
import type { InstitutionBenefitsSection } from "../../../web/sanity/typegen";

export default defineType({
  name: "institutionBenefitsSection",
  title: "Sekcja korzyści dla instytucji",
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
      name: "cardsTitle",
      title: "Tytuł sekcji kart",
      type: "string",
      initialValue: "Korzyści dla instytucji i organizacji",
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
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).max(3).required(),
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
    },
    prepare: ({ title }: Pick<InstitutionBenefitsSection, "title">) => {
      return {
        title: title || "Korzyści dla instytucji",
      };
    },
  },
});

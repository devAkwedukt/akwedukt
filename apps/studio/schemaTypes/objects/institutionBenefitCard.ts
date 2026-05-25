import { defineType, defineField } from "sanity";

export default defineType({
  name: "institutionBenefitCard",
  title: "Karta korzyści",
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
    prepare({ title }) {
      return {
        title: title || "Bez tytułu",
        media: () => "📄",
      };
    },
  },
});

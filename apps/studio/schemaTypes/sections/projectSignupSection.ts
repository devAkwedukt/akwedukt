import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectSignupSection",
  title: "Sekcja zapisów na projekt",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonUrl",
      title: "URL przycisku",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "decorImage",
      title: "Obraz",
      type: "image",
      description: "Obraz tło",
    }),
    defineField({
      name: "decorImageMob",
      title: "Obraz dla mobilnych",
      type: "image",
      description: "Obraz tło dla mobilnych",
    }),
  ],
  preview: {
    select: {
      title: "title",
      buttonText: "buttonText",
    },
    prepare({ title, buttonText }) {
      return {
        title: `Sekcja zapisów: ${title}`,
        subtitle: `Przycisk: ${buttonText}`,
      };
    },
  },
});

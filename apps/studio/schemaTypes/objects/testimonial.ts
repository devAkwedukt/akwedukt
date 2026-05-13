import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tekst opinii",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Imię i nazwisko autora",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Stanowisko/rola autora",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "authorRole",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle,
      };
    },
  },
});

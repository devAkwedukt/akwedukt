import { defineField, defineType } from "sanity";

export default defineType({
  name: "policySection",
  title: "Sekcja z informacjami",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
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
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "decor",
      title: "Styl: Obraz",
      type: "image",
    }),
    defineField({
      name: "backgroundColor",
      title: "Styl: Kolor tła",
      type: "string",
      options: {
        list: [
          { title: "Biały", value: "white" },
          { title: "Szary neutralny", value: "neutral-50" },
          { title: "Niebieski jasny", value: "deep-navy-blue-50" },
        ],
      },
      initialValue: "white",
    }),
  ],
  preview: {
    select: {
      title: "title",
      photo: "photo",
    },
    prepare({ title }) {
      return {
        title: title || "Sekcja z informacjami",
        subtitle: "Sekcja z informacjami",
      };
    },
  },
});

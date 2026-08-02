import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectTitleSection",
  title: "Projekt - Sekcja tytułowa",
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
      title: "Tytuł projektu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Podtytuł",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Opis projektu",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Styl: Obraz",
      type: "image",
    }),
    defineField({
      name: "imageMob",
      title: "Styl: Obraz dla telefonów",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        media: () => `📝`,
        title: selection.title,
        subtitle: "Projekt - Sekcja tytułowa",
      };
    },
  },
});

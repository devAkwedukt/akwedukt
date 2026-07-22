import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectTitleSection",
  title: "Projekt - Sekcja tytułowa",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł projektu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis projektu",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Obraz",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageMob",
      title: "Obraz dla telefonów",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "enabled",
      title: "Włącz sekcję",
      type: "boolean",
      initialValue: true,
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

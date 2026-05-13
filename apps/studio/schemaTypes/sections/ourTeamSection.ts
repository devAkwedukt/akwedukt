import { defineType, defineField } from "sanity";

export default defineType({
  name: "ourTeamSection",
  title: "Nasz zespół",
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
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
    }),
    defineField({
      name: "employees",
      title: "Pracownicy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "photo",
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
              name: "name",
              title: "Imię i nazwisko",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "position",
              title: "Stanowisko",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "bio",
              title: "Biografia",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      employees: "employees",
    },
    prepare({ title, employees }) {
      const employeeCount = employees?.length || 0;
      const firstEmployee = employees?.[0];
      return {
        title: title || "Nasz zespół",
        subtitle: `${employeeCount} pracownik${employeeCount !== 1 ? "ów" : ""}`,
        media: firstEmployee?.photo,
      };
    },
  },
});

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "volunteerTypes",
  title: "Sekcja wolontariatu",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sections",
      title: "Sekcje",
      type: "array",
      validation: (Rule) => Rule.required().min(3).max(3),

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "number",
              title: "Numer",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Nazwa sekcji",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "items",
              title: "Podpunkty",
              type: "array",
              validation: (Rule) => Rule.required().min(1).max(3),

              of: [
                defineArrayMember({
                  type: "object",

                  fields: [
                    defineField({
                      name: "title",
                      title: "Nagłówek",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: "description",
                      title: "Opis",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],

                  preview: {
                    select: {
                      title: "title",
                    },
                  },
                }),
              ],
            }),
          ],

          preview: {
            select: {
              title: "title",
              number: "number",
            },

            prepare({ title, number }) {
              return {
                title: `${number}. ${title}`,
              };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare({ title }) {
      return {
        title: title || "Sekcja wolontariatu",
      };
    },
  },
});

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "documentsTabSection",
  title: "Sekcja dokumentów z zakładkami",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Opis",
      type: "text",
    }),

    defineField({
      name: "tabs",
      title: "Zakładki",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "title",
              title: "Nazwa zakładki",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "documents",
              title: "Dokumenty",
              type: "array",
              validation: (Rule) => Rule.required().min(1),

              of: [
                defineArrayMember({
                  type: "object",

                  fields: [
                    defineField({
                      name: "title",
                      title: "Nazwa dokumentu",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: "description",
                      title: "Opis",
                      type: "text",
                    }),

                    defineField({
                      name: "file",
                      title: "Dokument",
                      type: "file",
                      options: {
                        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
                      },
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: "buttonText",
                      title: "Tekst przycisku",
                      type: "string",
                      initialValue: "Pobierz",
                    }),
                  ],

                  preview: {
                    select: {
                      title: "title",
                      file: "file",
                    },

                    prepare({ title, file }) {
                      return {
                        title: title || "Dokument",
                        subtitle: file ? "Plik dodany" : "Brak pliku",
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
                title: title || "Zakładka",
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
        title: title || "Sekcja dokumentów",
      };
    },
  },
});

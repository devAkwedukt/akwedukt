import { defineType, defineField } from "sanity";

export default defineType({
  name: "whatWeDoSection",
  title: "Co robimy",
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
      name: "subsubtitle",
      title: "Podpodtytuł",
      type: "string",
    }),
    defineField({
      name: "descriptions",
      title: "Opisy (5 sztuk)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Nagłówek",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
            }),
            defineField({
              name: "features",
              title: "Charakterystyki",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "description",
                      title: "Opis",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      description: "description",
                    },
                    prepare: ({ description }) => {
                      return {
                        title: description || "Charakterystyka",
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              heading: "heading",
            },
            prepare: ({ heading }) => {
              return {
                title: heading || "Opis",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(5).max(5),
    }),
    defineField({
      name: "slider",
      title: "Slider zdjęć",
      type: "array",
      of: [
        {
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
          ],
          preview: {
            select: {
              image: "image",
            },
            prepare: ({ image }) => {
              return {
                title: "Zdjęcie",
                media: image,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "decorImageTop",
      title: "Styl: Obraz (Desktop) góry",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
    defineField({
      name: "decorImageBottom",
      title: "Styl: Obraz (Desktop) dół",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
    defineField({
      name: "decorImageTopMob",
      title: "Styl: Obraz (Mobile) góry",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
    defineField({
      name: "decorImageBottomMob",
      title: "Styl: Obraz (Mobile) dół",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
  ],
});

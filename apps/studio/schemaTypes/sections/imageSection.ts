import { defineType, defineField } from "sanity";

export default defineType({
  name: "imageSection",
  title: "Sekcja zdjęć",
  type: "object",
  fields: [
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
            prepare: ({ image }) => ({
              title: "Zdjęcie",
              media: image,
            }),
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      media: "slider.0.image",
    },
    prepare({ media }) {
      return {
        title: "Sekcja zdjęć",
        media,
      };
    },
  },
});

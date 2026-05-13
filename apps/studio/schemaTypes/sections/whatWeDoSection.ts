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
              name: "description",
              title: "Opis",
              type: "richText",
              validation: (Rule) => Rule.required(),
            }),
          ],
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
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      descriptions: "descriptions",
      slider: "slider",
    },
    prepare({ title, descriptions, slider }) {
      const descCount = descriptions?.length || 0;
      const imageCount = slider?.length || 0;
      const firstImage = slider?.[0]?.image;
      return {
        title: title || "Co robimy",
        subtitle: `${descCount} opisów, ${imageCount} zdjęć`,
        media: firstImage,
      };
    },
  },
});

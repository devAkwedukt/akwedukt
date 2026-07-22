import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectVideoSection",
  title: "Sekcja wideo projektu",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "videoPosition",
      title: "Pozycja video",
      type: "string",
      initialValue: "left",
      options: {
        layout: "dropdown",
        list: [
          { title: "Po lewej", value: "left" },
          { title: "Po prawej", value: "right" },
        ],
      },
    }),
    defineField({
      name: "video",
      title: "Wideo",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "url",
          title: "URL wideo (YouTube, Vimeo, etc.)",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Tytuł wideo",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Linki do mediów społecznościowych",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Etykieta (opcjonalnie)",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      video: "video",
    },
    prepare({ title, video }) {
      return {
        title: title || "Sekcja wideo projektu",
        subtitle: video?.title || "Sekcja wideo",
      };
    },
  },
});

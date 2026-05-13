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
      type: "text",
      rows: 3,
      group: "content",
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
          name: "thumbnail",
          title: "Miniaturka wideo",
          type: "img",
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
                  { title: "Twitter", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Inny", value: "other" },
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
        media: video?.thumbnail,
      };
    },
  },
});

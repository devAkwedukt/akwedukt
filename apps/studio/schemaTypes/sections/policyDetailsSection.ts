import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "policyDetailsSection",
  title: "Sekcja szczegółów polityki",
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
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerImage",
      title: "Obraz pod sekcją",
      type: "image",
      description: "Obraz poza sekcją",
    }),
    defineField({
      name: "footerImageMob",
      title: "Obraz pod sekcją dla mobilnych",
      type: "image",
      description: "Obraz poza sekcją",
    }),

    defineField({
      name: "cards",
      title: "Karty",
      type: "array",
      validation: (Rule) => Rule.required().min(5).max(5),

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "content",
              title: "Treść",
              type: "richText",
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              content: "content",
            },

            prepare({ content }) {
              const text =
                content
                  ?.map((block: any) => block.children?.map((child: any) => child.text).join(""))
                  .join(" ")
                  .slice(0, 60) || "Brak treści";

              return {
                title: text + (text.length >= 60 ? "..." : ""),
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
        title: title || "Sekcja szczegółów polityki",
      };
    },
  },
});

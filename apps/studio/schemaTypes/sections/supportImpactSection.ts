import { defineType, defineField } from "sanity";

export default defineType({
  name: "supportImpactSection",
  title: "Support Impact",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
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
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Impact Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "amount",
              title: "Amount",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "string",
              options: {
                list: [
                  { title: "Blue", value: "blue" },
                  { title: "Purple", value: "purple" },
                  { title: "Pink", value: "pink" },
                  { title: "Orange", value: "orange" },
                ],
              },
              initialValue: "blue",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Support Impact",
        subtitle: title,
      };
    },
  },
});

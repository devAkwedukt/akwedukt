import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
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
      rows: 3,
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "url", type: "url" },
      ],
    }),
    defineField({
      name: "animatedImages",
      title: "Animated Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "position",
              title: "Position",
              type: "string",
              options: {
                list: [
                  { title: "Center", value: "center" },
                  { title: "Top Right", value: "top-right" },
                  { title: "Bottom Left", value: "bottom-left" },
                  { title: "Bottom Right", value: "bottom-right" },
                ],
              },
              initialValue: "center",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
});

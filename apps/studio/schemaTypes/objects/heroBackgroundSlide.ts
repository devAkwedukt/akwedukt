import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBackgroundSlide",
  title: "Hero Background Slide",
  type: "object",
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
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
      rows: 3,
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "url", type: "string" },
      ],
    }),
  ],
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadSection",
  title: "Nagłówek",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Nagłówek",
        subtitle: subtitle ? subtitle.substring(0, 50) + "..." : "",
      };
    },
  },
});

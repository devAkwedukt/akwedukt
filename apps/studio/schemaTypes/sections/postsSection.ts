import { defineField, defineType } from "sanity";

export default defineType({
  name: "postsSection",
  title: "Posty",
  type: "object",
  fields: [
    defineField({
      name: "displayNumber",
      title: "Liczba postów",
      type: "number",
    }),
  ],
  preview: {
    select: {
      displayNumber: "displayNumber",
    },
    prepare(selection) {
      return {
        title: "Posty",
        subtitle: `${selection.displayNumber || 0} post${selection.displayNumber !== 1 ? "ów" : ""}`,
      };
    },
  },
});

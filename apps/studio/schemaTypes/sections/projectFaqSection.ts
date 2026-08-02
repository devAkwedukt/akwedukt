import { defineField, defineType } from "sanity";
import type { ProjectFaqSection } from "../../../web/sanity/typegen";

export default defineType({
  name: "projectFaqSection",
  title: "FAQ – numerowana lista pytań i odpowiedzi",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
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
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Pytania i odpowiedzi",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pytanie",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Odpowiedź",
              type: "richText",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare: ({ items }: Pick<ProjectFaqSection, "items">) => {
      const count = items ? items.length : 0;
      return {
        title: `Sekcja FAQ (${count} pytań)`,
      };
    },
  },
});

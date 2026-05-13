import { defineField, defineType } from "sanity";
import type { ProjectQuestionsSection } from "../../../web/sanity/typegen";

export default defineType({
  name: "projectQuestionsSection",
  title: "Sekcja pytań o projekt (Dla kogo?, Dlaczego?, Kto to robi?)",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "questions",
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
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: {
      questions: "questions",
    },
    prepare: ({ questions }: Pick<ProjectQuestionsSection, "questions">) => {
      return {
        title: `Sekcja pytań (${questions?.length || 0} pytań)`,
      };
    },
  },
});

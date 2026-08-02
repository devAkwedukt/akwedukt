import { defineField, defineType } from "sanity";
import type { ProjectQuestionsSection } from "../../../web/sanity/typegen";

export default defineType({
  name: "projectQuestionsSection",
  title: "Sekcja pytań o projekt (Dla kogo?, Dlaczego?, Kto to robi?)",
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
      name: "backgroundColor",
      title: "Styl: Kolor tła",
      type: "string",
      options: {
        list: [
          { title: "Biały", value: "white" },
          { title: "Szary neutralny", value: "neutral-50" },
          { title: "Niebieski jasny", value: "deep-navy-blue-50" },
        ],
      },
      initialValue: "white",
    }),
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

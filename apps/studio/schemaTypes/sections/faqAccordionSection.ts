import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqAccordionSection",
  title: "Sekcja FAQ z akordeonem",
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
              type: "text",
              rows: 2,
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
      title: "title",
      questions: "questions",
    },
    prepare({ title, questions }) {
      const questionCount = questions?.length || 0;
      const firstQuestion = questions?.[0]?.question;
      return {
        title: title || "Sekcja FAQ z akordeonem",
        subtitle: `${questionCount} pytanie${questionCount !== 1 ? "nia" : ""}`,
        description: firstQuestion ? firstQuestion.substring(0, 50) + "..." : "",
      };
    },
  },
});

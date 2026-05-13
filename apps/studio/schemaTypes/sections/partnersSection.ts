import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnersSection",
  title: "Partnerzy",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Włącz sekcję partnerów",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partners",
      title: "Partnerzy",
      type: "array",
      of: [{ type: "partner" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      partners: "partners",
    },
    prepare({ title, partners }) {
      const partnerCount = partners?.length || 0;
      const firstPartner = partners?.[0];
      return {
        title: title || "Partnerzy",
        subtitle: `${partnerCount} partner${partnerCount !== 1 ? "ów" : ""}`,
        media: firstPartner?.logo,
      };
    },
  },
});

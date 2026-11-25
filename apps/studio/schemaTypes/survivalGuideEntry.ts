import { defineField, defineType } from "sanity";

export default defineType({
  name: "survivalGuideEntry",
  title: "Survival Guide",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "keywords",
      title: "Słowa do wyszukiwania",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "position", title: "Kolejność", type: "number", initialValue: 100 }),
    defineField({
      name: "body",
      title: "Treść",
      type: "richText",
      validation: (r) => r.required(),
    }),
  ],
});

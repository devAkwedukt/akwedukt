import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "wesprzyj",
  title: "Wesprzyj nas",
  type: "document",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    documentNameField,
    defineField({
      name: "sections",
      title: "Sekcje",
      type: "array",
      group: "content",
      options: {
        layout: "list",
      },
      of: [
        defineArrayMember({
          name: "supportHeroSection",
          type: "supportHeroSection",
        }),
        defineArrayMember({
          name: "supportOptionsSection",
          type: "supportOptionsSection",
        }),
        defineArrayMember({
          name: "supportImpactSection",
          type: "supportImpactSection",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "documentName",
    },
  },
});

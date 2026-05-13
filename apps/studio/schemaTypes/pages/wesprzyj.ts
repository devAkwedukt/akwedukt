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
        layout: "grid",
      },
      of: [
        defineArrayMember({
          name: "heroSection",
          type: "heroSection",
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

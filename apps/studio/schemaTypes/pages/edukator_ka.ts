import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "edukator_ka",
  title: "Edukator_ka",
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
          name: "teacherBenefitsSection",
          type: "teacherBenefitsSection",
        }),
        defineArrayMember({
          name: "teacherEngagementSection",
          type: "teacherEngagementSection",
        }),
        defineArrayMember({
          name: "documentsSection",
          type: "documentsSection",
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

import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";
import cooperationModelsSection from "../sections/cooperationModelsSection";
import coalitionSection from "../sections/coalitionSection";

export default defineType({
  name: "dlaInstytucji",
  title: "Dla instytucji",
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
          name: "institutionBenefitsSection",
          type: "institutionBenefitsSection",
        }),
        defineArrayMember({
          name: "cooperationModelsSection",
          type: "cooperationModelsSection",
        }),
        defineArrayMember({
          name: "partnersSection",
          type: "partnersSection",
        }),
        defineArrayMember({
          name: "coalitionSection",
          type: "coalitionSection",
        }),
        defineArrayMember({
          name: "valuesSection",
          type: "valuesSection",
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

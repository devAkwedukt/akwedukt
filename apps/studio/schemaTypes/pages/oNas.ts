import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "oNas",
  title: "O nas",
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
          name: "heroBackgroundSection",
          type: "heroBackgroundSection",
        }),
        defineArrayMember({
          name: "whoWeAreSection",
          type: "whoWeAreSection",
        }),
        defineArrayMember({
          name: "whatWeDoSection",
          type: "whatWeDoSection",
          preview: {
            select: {
              title: "title",
            },
            prepare: ({ title }) => {
              return {
                title: title || "Co robimy",
              };
            },
          },
        }),
        defineArrayMember({
          name: "ourHistorySection",
          type: "ourHistorySection",
        }),
        defineArrayMember({
          name: "ourTeamSection",
          type: "ourTeamSection",
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

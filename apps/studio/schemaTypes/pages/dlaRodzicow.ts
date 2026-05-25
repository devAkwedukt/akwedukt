import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "dlaRodzicow",
  title: "Dla rodziców",
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
          name: "projectsGallerySection",
          type: "projectsGallerySection",
        }),
        defineArrayMember({
          name: "faqAccordionSection",
          type: "faqAccordionSection",
        }),
        defineArrayMember({
          name: "testimonialsSection",
          type: "testimonialsSection",
        }),
        defineArrayMember({
          name: "photoInfoSection",
          type: "photoInfoSection",
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

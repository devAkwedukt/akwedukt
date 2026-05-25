import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "wolontariuszy",
  title: "Wolontariuszy",
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
          name: "cooperationCardsSection",
          type: "cooperationCardsSection",
        }),
        defineArrayMember({
          name: "aboutStatsSection",
          type: "aboutStatsSection",
        }),
        defineArrayMember({
          name: "partnersSection",
          type: "partnersSection",
        }),
        defineArrayMember({
          name: "postsGallerySection",
          type: "postsGallerySection",
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

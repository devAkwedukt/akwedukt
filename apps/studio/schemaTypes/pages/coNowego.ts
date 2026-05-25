import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "coNowego",
  title: "Co nowego",
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
          name: "postsGallerySection",
          type: "postsGallerySection",
        }),
        defineArrayMember({
          name: "projectsGallerySection",
          type: "projectsGallerySection",
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

import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "home",
  title: "Strona główna",
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
        defineArrayMember({
          name: "heroBackgroundSection",
          type: "heroBackgroundSection",
        }),
        defineArrayMember({
          name: "projectsGallerySection",
          type: "projectsGallerySection",
        }),
        defineArrayMember({
          name: "aboutSection",
          type: "aboutSection",
        }),
        defineArrayMember({
          name: "partnersSection",
          type: "partnersSection",
        }),
        defineArrayMember({
          name: "testimonialsSection",
          type: "testimonialsSection",
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

import { defineField, defineType, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";

export default defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Główne zdjęcie",
      type: "img",
      group: "content",
    }),
    defineField({
      name: "shortDescription",
      title: "Krótki opis (dla podglądu)",
      type: "text",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectTypes",
      title: "Typ projektu",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Polski", value: "polish" },
          { title: "Międzynarodowy", value: "international" },
          { title: "Międzynarodowy (EN)", value: "international_en" },
        ],
      },
    }),
    defineField({
      name: "projectStatus",
      title: "Status projektu",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Oczekiwany", value: "pending" },
          { title: "Aktywny", value: "active" },
          { title: "Zakończony", value: "completed" },
        ],
      },
    }),
    defineField({
      name: "startDate",
      title: "Data rozpoczęcia",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "endDate",
      title: "Data zakończenia",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "sections",
      title: "Sekcje strony",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "projectTitleSection",
          type: "projectTitleSection",
        }),
        defineArrayMember({
          name: "projectFaqSection",
          type: "projectFaqSection",
        }),
        defineArrayMember({
          name: "projectSignupSection",
          type: "projectSignupSection",
        }),
        defineArrayMember({
          name: "documentsSection",
          type: "documentsSection",
        }),
        defineArrayMember({
          name: "projectPhotoInfoSection",
          type: "projectPhotoInfoSection",
        }),
        defineArrayMember({
          name: "projectQuestionsSection",
          type: "projectQuestionsSection",
        }),
        defineArrayMember({
          name: "partnersSection",
          type: "partnersSection",
        }),
        defineArrayMember({
          name: "projectVideoSection",
          type: "projectVideoSection",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: "Projekt",
      };
    },
  },
});

import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: ComposeIcon,
  fields: [
    languageField,
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim(),
      },
    }),
    defineField({ name: "date", type: "datetime" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "publish" },
          { title: "Future", value: "future" },
          { title: "Draft", value: "draft" },
          { title: "Pending", value: "pending" },
          { title: "Private", value: "private" },
          { title: "Trash", value: "trash" },
          { title: "Auto-Draft", value: "auto-draft" },
          { title: "Inherit", value: "inherit" },
        ],
      },
    }),
    defineField({
      name: "content",
      type: "richText",
    }),
    defineField({
      name: "excerpt",
      type: "richText",
    }),
    defineField({ name: "featuredMedia", type: "image" }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredMedia",
    },
  },
});

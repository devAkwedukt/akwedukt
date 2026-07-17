import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    languageField,
    defineField({ name: "name", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
});

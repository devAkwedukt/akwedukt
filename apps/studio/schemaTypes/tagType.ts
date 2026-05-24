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
    defineField({ name: "slug", type: "slug" }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
});

import { FilterIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: FilterIcon,
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

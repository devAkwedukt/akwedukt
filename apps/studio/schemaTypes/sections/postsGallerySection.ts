import { defineField, defineType } from "sanity";

export default defineType({
  name: "postsGallerySection",
  title: "Galeria postów",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "text",
    }),
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Najnowsze posty", value: "latest" },
          { title: "Następne posty", value: "next" },
        ],
      },
      initialValue: "latest",
    }),
    defineField({
      name: "limit",
      title: "Liczba postów",
      type: "number",
      initialValue: 3,
    }),
    defineField({
      name: "ctaText",
      title: "Tekst przycisku CTA",
      type: "string",
      initialValue: "Czytaj więcej",
    }),
    defineField({
      name: "seeAllPostsText",
      title: "Tekst przycisku 'Zobacz wszystkie posty'",
      type: "string",
    }),
    defineField({
      name: "seeAllPostsUrl",
      title: "URL strony z wszystkimi postami",
      type: "string",
      initialValue: "/posts",
    }),
    defineField({
      name: "ctaVariant",
      title: "Wariant przycisku",
      type: "string",
      options: {
        list: [
          { title: "Podstawowy", value: "primary" },
          { title: "Dodatkowy", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
      limit: "limit",
    },
    prepare(selection) {
      const { title, variant, limit } = selection;
      const variantText = variant === "latest" ? "Najnowsze" : "Następne";
      return {
        title: title || "Galeria postów",
        subtitle: `${variantText} posty (${limit || 3})`,
      };
    },
  },
});

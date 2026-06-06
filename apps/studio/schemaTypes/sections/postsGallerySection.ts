import { defineField, defineType } from "sanity";

export default defineType({
  name: "postsGallerySection",
  title: "Galeria postów",
  type: "object",
  groups: [
    { name: "content", title: "Treść" },
    { name: "settings", title: "Ustawienia" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Najnowsze posty", value: "latest" },
          { title: "Następne posty", value: "next" },
        ],
      },
      initialValue: "latest",
    }),
    defineField({
      name: "posts",
      title: "Posty",
      type: "array",
      group: "content",
      description: "Pozostaw puste, aby automatycznie załadować posty zgodnie z wariantem",
      of: [
        {
          type: "reference",
          to: { type: "post" },
        },
      ],
    }),
    defineField({
      name: "limit",
      title: "Liczba postów",
      type: "number",
      group: "settings",
      description:
        "Maksymalna liczba postów do wyświetlenia (działa tylko przy automatycznym ładowaniu)",
      initialValue: 3,
    }),
    defineField({
      name: "ctaText",
      title: "Tekst przycisku CTA",
      type: "string",
      group: "content",
      initialValue: "Czytaj więcej",
    }),
    defineField({
      name: "seeAllPostsText",
      title: "Tekst przycisku 'Zobacz wszystkie posty'",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "seeAllPostsUrl",
      title: "URL strony z wszystkimi postami",
      type: "string",
      group: "content",
      initialValue: "/posts",
    }),
    defineField({
      name: "ctaVariant",
      title: "Wariant przycisku",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Podstawowy", value: "primary" },
          { title: "Dodatkowy", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "topImage",
      title: "Obraz na górze",
      type: "image",
    }),
    defineField({
      name: "topImage2",
      title: "Obraz na górze (2)",
      type: "image",
    }),
    defineField({
      name: "bottomImage",
      title: "Obraz na dole",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
    defineField({
      name: "footerImage",
      title: "Obraz pod sekcją",
      type: "image",
      description: "Obraz poza sekcją",
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
      posts: "posts",
      limit: "limit",
    },
    prepare(selection) {
      const { title, variant, posts, limit } = selection;
      const variantText = variant === "latest" ? "Najnowsze" : "Następne";
      const postsCount = posts?.length || 0;
      const isManual = postsCount > 0;
      return {
        title: title || "Galeria postów",
        subtitle: `${variantText} posty • ${isManual ? postsCount + " wybrane" : "do " + (limit || 3) + " automatycznie"}`,
      };
    },
  },
});

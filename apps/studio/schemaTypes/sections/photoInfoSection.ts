import { defineField, defineType } from "sanity";

export default defineType({
  name: "photoInfoSection",
  title: "Sekcja zdjęcie z informacjami",
  type: "object",
  groups: [{ name: "content", title: "Treść" }],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Zdjęcie",
      type: "img",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePosition",
      title: "Pozycja zdjęcia",
      type: "string",
      initialValue: "left",
      options: {
        layout: "dropdown",
        list: [
          { title: "Po lewej", value: "left" },
          { title: "Po prawej", value: "right" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Przycisk",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "ctaVariant",
          title: "Wariant przycisku",
          type: "string",
          options: {
            list: [
              { title: "Podstawowy", value: "primary" },
              { title: "Dodatkowy", value: "secondary" },
              { title: "Link", value: "link" },
            ],
          },
          initialValue: "link",
        }),
        defineField({
          name: "text",
          title: "Tekst przycisku",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL przycisku",
          type: "string",
          description: "Może być pełnym URL lub ścieżką wewnętrznej strony (np. '/o-nas')",
        }),
      ],
    }),
    defineField({
      name: "backgroundColor",
      title: "Kolor tła",
      type: "string",
      options: {
        list: [
          { title: "Biały", value: "white" },
          { title: "Szary neutralny", value: "neutral-50" },
          { title: "Niebieski jasny", value: "deep-navy-blue-50" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "decorImage",
      title: "Obraz",
      type: "image",
      description: "Obraz wewnątrz sekcji",
    }),
    defineField({
      name: "footerImage",
      title: "Obraz pod sekcją",
      type: "image",
      description: "Obraz poza sekcją",
    }),
    defineField({
      name: "footerImageMob",
      title: "Obraz pod sekcją dla mobilnych",
      type: "image",
      description: "Obraz poza sekcją",
    }),
  ],
  preview: {
    select: {
      title: "title",
      photo: "photo",
    },
    prepare({ title, photo }) {
      return {
        title: title || "Sekcja zdjęcie z informacjami",
        subtitle: "Sekcja zdjęcie z informacjami",
        media: photo,
      };
    },
  },
});

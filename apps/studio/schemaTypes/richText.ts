import { defineArrayMember, defineField, defineType } from "sanity";

function isFacebookVideoUrl(value: unknown) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      (hostname === "facebook.com" || hostname.endsWith(".facebook.com") || hostname === "fb.watch")
    );
  } catch {
    return false;
  }
}

export default defineType({
  name: "richText",
  title: "Treść",
  type: "array",

  of: [
    // Text blocks
    defineArrayMember({
      type: "block",

      styles: [
        {
          title: "Tekst",
          value: "normal",
        },
        {
          title: "H1",
          value: "h1",
        },
        {
          title: "H2",
          value: "h2",
        },
        {
          title: "H3",
          value: "h3",
        },
        {
          title: "H4",
          value: "h4",
        },
        {
          title: "H5",
          value: "h5",
        },
        {
          title: "H6",
          value: "h6",
        },
        {
          title: "Cytat",
          value: "blockquote",
        },
      ],

      lists: [
        {
          title: "Lista punktowana",
          value: "bullet",
        },
        {
          title: "Lista numerowana",
          value: "number",
        },
      ],

      marks: {
        decorators: [
          {
            title: "Pogrubienie",
            value: "strong",
          },
          {
            title: "Kursywa",
            value: "em",
          },
          {
            title: "Podkreślenie",
            value: "underline",
          },
          {
            title: "Przekreślenie",
            value: "strike-through",
          },
          {
            title: "Kod",
            value: "code",
          },
        ],

        annotations: [
          // Regular link
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.required(),
              },
              {
                title: "Otwórz w nowej karcie",
                name: "blank",
                type: "boolean",
                initialValue: false,
              },
              {
                title: "Rel",
                name: "rel",
                type: "string",
                initialValue: "noopener noreferrer",
              },
            ],
          },

          // Text color
          {
            title: "Kolor tekstu",
            name: "textColor",
            type: "object",
            fields: [
              {
                title: "Kolor",
                name: "color",
                type: "string",
                options: {
                  list: [
                    { title: "Czarny", value: "black" },
                    { title: "Szary", value: "gray" },
                    { title: "Biały", value: "white" },
                    { title: "Czerwony", value: "red" },
                    { title: "Niebieski", value: "blue" },
                    { title: "Zielony", value: "green" },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),

    // Internal / Sanity image
    defineArrayMember({
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Opis alternatywny",
          type: "string",
        },
        {
          name: "caption",
          title: "Podpis",
          type: "string",
        },
      ],
    }),

    // External image
    defineArrayMember({
      type: "externalImage",
    }),

    // Facebook video / Reel
    defineArrayMember({
      name: "facebookVideo",
      title: "Wideo z Facebooka",
      type: "object",
      fields: [
        defineField({
          name: "url",
          title: "Link do filmu lub Reel na Facebooku",
          type: "url",
          validation: (Rule) =>
            Rule.required()
              .uri({ scheme: ["https"] })
              .custom((value) =>
                isFacebookVideoUrl(value) ? true : "Wklej link z domeny facebook.com lub fb.watch."
              ),
        }),
        defineField({
          name: "caption",
          title: "Podpis (opcjonalnie)",
          type: "string",
        }),
      ],
      preview: {
        select: {
          title: "caption",
          subtitle: "url",
        },
        prepare({ title, subtitle }) {
          return {
            title: title || "Wideo z Facebooka",
            subtitle,
          };
        },
      },
    }),

    // Empty line / spacer
    defineArrayMember({
      name: "spacer",
      title: "Pusta linia",
      type: "object",
      fields: [
        {
          name: "size",
          title: "Wysokość odstępu",
          type: "string",
          options: {
            list: [
              { title: "Mały", value: "small" },
              { title: "Średni", value: "medium" },
              { title: "Duży", value: "large" },
            ],
            layout: "radio",
          },
          initialValue: "medium",
        },
      ],
      preview: {
        prepare() {
          return {
            title: "Pusta linia",
          };
        },
      },
    }),
  ],
});

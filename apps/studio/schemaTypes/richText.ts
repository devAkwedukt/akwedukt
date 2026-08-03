import { defineArrayMember, defineType } from "sanity";

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

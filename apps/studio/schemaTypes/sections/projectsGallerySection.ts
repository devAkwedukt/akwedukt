import { defineField, defineType } from "sanity";

type DecorationVariant =
  | "what-we-do-international"
  | "what-we-do-polish"
  | "cooperation-international-en"
  | "what-new-current"
  | "parents-current";

const isDecorationVariantHidden =
  (variant: DecorationVariant) =>
  ({ document, path }: { document?: unknown; path: unknown[] }) => {
    const keyedSegment = path[1] as { _key?: string };

    const sections = (
      document as {
        sections?: Array<{
          _key: string;
          decorationVariant?: DecorationVariant;
        }>;
      }
    )?.sections;

    const currentSection = sections?.find((section) => section._key === keyedSegment?._key);

    return currentSection?.decorationVariant !== variant;
  };

export default defineType({
  name: "projectsGallerySection",
  title: "Sekcja galerii projektów",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "text",
      group: "content",
      rows: 3,
    }),
    defineField({
      name: "projects",
      title: "Projekty",
      type: "array",
      group: "content",
      description: "Pozostaw puste, aby automatycznie załadować projekty zgodnie z filtrem",
      of: [
        {
          type: "reference",
          to: { type: "project" },
        },
      ],
    }),
    defineField({
      name: "projectFilter",
      title: "Filtr projektów",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Wszystkie projekty", value: "all" },
          { title: "Tylko projekty polskie", value: "polish" },
          { title: "Tylko projekty międzynarodowe", value: "international" },
          { title: "Tylko projekty międzynarodowe (EN)", value: "international_en" },
        ],
      },
      initialValue: "all",
    }),
    defineField({
      name: "statusFilter",
      title: "Filtr statusu",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Wszystkie statusy", value: "all" },
          { title: "Oczekiwany", value: "pending" },
          { title: "Aktywny", value: "active" },
          { title: "Zakończony", value: "completed" },
        ],
      },
      initialValue: "all",
    }),
    defineField({
      name: "limit",
      title: "Limit projektów",
      type: "number",
      group: "settings",
      description:
        "Maksymalna liczba projektów do wyświetlenia (działa tylko przy automatycznym ładowaniu)",
      initialValue: 3,
    }),
    defineField({
      name: "ctaText",
      title: "Tekst przycisku",
      type: "string",
      group: "content",
      initialValue: "Dowiedz się więcej",
    }),
    defineField({
      name: "ctaVariant",
      title: "Styl: Wariant przycisku",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Link", value: "link" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "seeAllProjectsText",
      title: "Tekst przycisku 'Zobacz wszystkie projekty'",
      type: "string",
      group: "content",
      initialValue: "Zobacz wszystkie projekty",
    }),
    defineField({
      name: "seeAllProjectsUrl",
      title: "URL przycisku 'Zobacz wszystkie projekty'",
      type: "string",
      group: "content",
      description: "Pełny URL do strony z wszystkimi projektami",
    }),
    defineField({
      name: "backgroundColor",
      title: "Styl: Kolor tła",
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
      name: "decorationVariant",
      title: "Styl: Wariant dekoracji",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Co robimy - Międzynarodowe projekty", value: "what-we-do-international" },
          { title: "Co robimy - Polskie projekty", value: "what-we-do-polish" },
          {
            title: "International projects (EN)",
            value: "cooperation-international-en",
          },
          { title: "Co nowego - Aktualne projekty", value: "what-new-current" },
          { title: "Dla rodziców - Aktualne projekty", value: "parents-current" },
        ],
      },
    }),
    defineField({
      name: "decorationImages",
      title: "Styl: Obrazy dekoracji",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "whatWeDoInternational",
          title: "Co robimy - Międzynarodowe projekty",
          type: "object",
          hidden: isDecorationVariantHidden("what-we-do-international"),
          fields: [
            defineField({
              name: "desktop",
              title: "Styl: Desktop - Gwiazda",
              type: "image",
            }),
            defineField({
              name: "desktop2",
              title: "Styl: Desktop - Ptak",
              type: "image",
            }),
            defineField({
              name: "mobile",
              title: "Styl: Mobile - Niebieska gwiazda",
              type: "image",
            }),
            defineField({
              name: "mobile2",
              title: "Styl: Mobile - Fala",
              type: "image",
            }),
          ],
        }),

        defineField({
          name: "whatWeDoPolish",
          title: "Co robimy - Polskie projekty",
          type: "object",
          hidden: isDecorationVariantHidden("what-we-do-polish"),
          fields: [
            defineField({
              name: "desktop",
              title: "Styl: Desktop - Wielokolorowa linia lewa",
              type: "image",
            }),
            defineField({
              name: "mobile",
              title: "Styl: Mobile - Wielokolorowa linia prawa",
              type: "image",
            }),
          ],
        }),

        defineField({
          name: "cooperationInternationalEn",
          title: "Międzynarodowe projekty (EN)",
          type: "object",
          hidden: isDecorationVariantHidden("cooperation-international-en"),
          fields: [
            defineField({
              name: "desktop",
              title: "Styl: Desktop - Doodle",
              type: "image",
            }),
            defineField({
              name: "backgroundImage",
              title: "Styl: Desktop - Tło",
              type: "image",
            }),
          ],
        }),

        defineField({
          name: "parentsCurrent",
          title: "Dla rodziców - Aktualne projekty",
          type: "object",
          hidden: isDecorationVariantHidden("parents-current"),
          fields: [
            defineField({
              name: "desktop",
              title: "Styl: Desktop - Gwiazda",
              type: "image",
            }),
          ],
        }),

        defineField({
          name: "whatNewCurrent",
          title: "Co nowego - Aktualne projekty",
          type: "object",
          hidden: isDecorationVariantHidden("what-new-current"),
          fields: [
            defineField({
              name: "desktop",
              title: "Styl: Desktop",
              type: "image",
            }),
            defineField({
              name: "mobile",
              title: "Mobile",
              type: "image",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      projectFilter: "projectFilter",
      statusFilter: "statusFilter",
      projects: "projects",
      limit: "limit",
      firstProjectImage: "projects.0.mainImage",
    },
    prepare({ title, projectFilter, statusFilter, projects, limit, firstProjectImage }) {
      const filterLabels = {
        all: "Wszystkie",
        polish: "Polskie",
        international: "Międzynarodowe",
        international_en: "Międzynarodowe (EN)",
      };

      const statusLabels = {
        all: "Wszystkie statusy",
        pending: "Oczekiwany",
        active: "Aktywny",
        completed: "Zakończony",
      };

      const filterLabel = filterLabels[projectFilter as keyof typeof filterLabels] || "Wszystkie";
      const statusLabel =
        statusLabels[statusFilter as keyof typeof statusLabels] || "Wszystkie statusy";
      const projectsCount = projects?.length || 0;
      const isManual = projectsCount > 0;

      return {
        title: title || "Sekcja projektów",
        subtitle: `${filterLabel} • ${statusLabel} • ${isManual ? projectsCount + " wybrane" : "do " + limit + " automatycznie"}`,
        media: firstProjectImage,
      };
    },
  },
});

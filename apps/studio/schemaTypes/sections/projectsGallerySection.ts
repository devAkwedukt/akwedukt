import { defineField, defineType } from "sanity";

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
      title: "Wariant przycisku",
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

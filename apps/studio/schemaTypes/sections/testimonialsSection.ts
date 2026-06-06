import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Opinie",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Włącz sekcję opinii",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł sekcji",
      type: "text",
    }),
    defineField({
      name: "testimonials",
      title: "Opinie",
      type: "array",
      of: [{ type: "testimonial" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "bottomDoodle",
      title: "Doodle na dole",
      type: "image",
    }),
    defineField({
      name: "bottomImage",
      title: "Obraz pod sekcją",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      testimonials: "testimonials",
    },
    prepare({ title, testimonials }) {
      const testimonialCount = testimonials?.length || 0;
      return {
        title: title || "Opinie",
        subtitle: `${testimonialCount} opin${testimonialCount !== 1 ? "ie" : "ia"}`,
      };
    },
  },
});

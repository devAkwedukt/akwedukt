import { defineType, defineField } from "sanity";

export default defineType({
  name: "supportOptionsSection",
  title: "Support Options",
  type: "object",
  fields: [
    defineField({
      name: "donationCard",
      title: "Donation Card",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "accountNumber",
          title: "Account Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "transferTitle",
          title: "Transfer Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "fundraisingCard",
      title: "Fundraising Card",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "volunteerCard",
      title: "Volunteer Card",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      donationTitle: "donationCard.title",
    },
    prepare({ donationTitle }) {
      return {
        title: "Support Options",
        subtitle: donationTitle,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Ustawienia Danych Stopki",
  type: "document",
  fields: [
    defineField({
      name: "companyInfo",
      title: "Dane Organizacji",
      type: "object",
      fields: [
        { name: "name", title: "Nazwa", type: "string", initialValue: "Stowarzyszenie Akwedukt" },
        { name: "street", title: "Ulica i numer", type: "string" },
        { name: "city", title: "Kod pocztowy i miasto", type: "string" },
      ],
    }),
    defineField({
      name: "legalInfo",
      title: "Dane Rejestrowe",
      type: "object",
      fields: [
        { name: "nip", title: "NIP", type: "string" },
        { name: "krs", title: "KRS", type: "string" },
        { name: "regon", title: "REGON", type: "string" },
      ],
    }),
    defineField({
      name: "bankAccount",
      title: "Konto Bankowe",
      type: "object",
      fields: [
        { name: "bankName", title: "Nazwa banku", type: "string" },
        { name: "accountNumber", title: "Numer konta", type: "string" },
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontakt",
      type: "object",
      fields: [
        { name: "email", title: "Adres e-mail", type: "string" },
        {
          name: "phones",
          title: "Numery telefonu",
          type: "array",
          of: [{ type: "string" }],
          description: "Dodaj numery telefonu w formacie np. (+48) 661 936 759",
        },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Media Społecznościowe",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
            },
            { name: "url", title: "Link (URL)", type: "url" },
          ],
        },
      ],
    }),
  ],
});

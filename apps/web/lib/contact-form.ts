import { z } from "zod";

export const contactSubjectIds = ["volunteering", "event", "partnership", "other"] as const;
export const contactFormLanguages = ["pl", "en"] as const;

export type ContactSubjectId = (typeof contactSubjectIds)[number];
export type ContactFormLanguage = (typeof contactFormLanguages)[number];

const singleLineText = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .refine((value) => !/[\u0000-\u001f\u007f]/u.test(value));

export const contactFormFieldsSchema = z
  .object({
    name: singleLineText,
    email: z.string().trim().min(1).max(254).email(),
    subject: z.enum(contactSubjectIds),
    message: z
      .string()
      .trim()
      .min(10)
      .max(5000)
      .refine((value) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)),
    acceptedTerms: z.literal(true),
  })
  .strict();

export const contactFormRequestSchema = contactFormFieldsSchema
  .extend({
    language: z.enum(contactFormLanguages),
    sourcePath: z
      .string()
      .trim()
      .max(500)
      .regex(/^\/[^?#\s]*$/u),
    website: z.string().max(200),
  })
  .strict();

export type ContactFormRequest = z.infer<typeof contactFormRequestSchema>;

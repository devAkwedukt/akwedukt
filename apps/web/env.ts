import "server-only";

import { z } from "zod";

const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const vDateRegex = /^v\d{4}-\d{2}-\d{2}$/;
const vDateError = { message: "Must be in format vYYYY-MM-DD" };

export const envSchema = z.object({
  SANITY_REVALIDATE_SECRET: z
    .string()
    .regex(base64Regex, "Must be a valid Base64 string")
    .optional(),
  SANITY_API_READ_TOKEN: z.union([z.literal("false"), z.string().min(1)]).optional(),
  DEFAULT_REVALIDATE: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: "Must be a number if set",
    }),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_ORGANIZATION_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().regex(vDateRegex, vDateError),
  NEXT_PUBLIC_SANITY_IMAGE_QUALITY: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 100;
      },
      { message: "Must be a number between 1 and 100 if set" }
    ),
  NEXT_PUBLIC_ORIGIN: z.url(),
  NEXT_PUBLIC_SANITY_USE_CDN: z.enum(["true", "false"]),
  CI: z.enum(["true", "false"]).optional(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.url().optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
  FACEBOOK_IMPORT_ENABLED: z.enum(["true", "false"]).optional(),
  FACEBOOK_IMPORT_START_AT: z.string().min(1).optional(),
  FACEBOOK_IMPORT_SANITY_DATASET: z.enum(["development", "production"]).optional(),
  FACEBOOK_PAGE_ID: z.string().min(1).optional(),
  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().min(1).optional(),
  FACEBOOK_APP_SECRET: z.string().min(1).optional(),
  FACEBOOK_WEBHOOK_VERIFY_TOKEN: z.string().min(1).optional(),
  SANITY_FACEBOOK_IMPORT_TOKEN: z.string().min(1).optional(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

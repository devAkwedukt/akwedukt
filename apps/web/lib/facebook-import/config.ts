type Environment = Record<string, string | undefined>;

export type FacebookImportConfig =
  | {
      enabled: false;
    }
  | {
      enabled: true;
      startAt: string;
      pageId: string;
      pageAccessToken: string;
      appSecret: string;
      webhookVerifyToken: string;
      sanityWriteToken: string;
      sanityDataset: "development" | "production";
    };

function required(env: Environment, name: string): string {
  const value = env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function readFacebookImportConfig(env: Environment): FacebookImportConfig {
  const enabledValue = env.FACEBOOK_IMPORT_ENABLED?.trim() ?? "false";

  if (enabledValue !== "true" && enabledValue !== "false") {
    throw new Error("FACEBOOK_IMPORT_ENABLED must be either true or false");
  }

  if (enabledValue === "false") {
    return { enabled: false };
  }

  const startAt = required(env, "FACEBOOK_IMPORT_START_AT");
  const parsedStartAt = new Date(startAt);

  if (Number.isNaN(parsedStartAt.getTime())) {
    throw new Error("FACEBOOK_IMPORT_START_AT must be a valid ISO date");
  }

  const sanityDataset = required(env, "FACEBOOK_IMPORT_SANITY_DATASET");

  if (sanityDataset !== "development" && sanityDataset !== "production") {
    throw new Error("FACEBOOK_IMPORT_SANITY_DATASET must be development or production");
  }

  return {
    enabled: true,
    startAt: parsedStartAt.toISOString(),
    pageId: required(env, "FACEBOOK_PAGE_ID"),
    pageAccessToken: required(env, "FACEBOOK_PAGE_ACCESS_TOKEN"),
    appSecret: required(env, "FACEBOOK_APP_SECRET"),
    webhookVerifyToken: required(env, "FACEBOOK_WEBHOOK_VERIFY_TOKEN"),
    sanityWriteToken: required(env, "SANITY_FACEBOOK_IMPORT_TOKEN"),
    sanityDataset,
  };
}

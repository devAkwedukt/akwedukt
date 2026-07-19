declare module "klaro" {
  export interface KlaroConfig {
    storageMethod?: "cookie" | "localStorage";
    storageName?: string;
    cookieExpiresAfterDays?: number;
    privacyPolicy?: string;
    services: Service[];
    translations: Translations;
  }

  export interface Service {
    name: string;
    default?: boolean;
    purposes: string[];
    cookies?: (string | RegExp | [string | RegExp, string, string])[];
    translations?: {
      zz: { title: string; description: string };
      [lang: string]: { title: string; description: string };
    };
  }

  export interface Translations {
    zz: Translation;
    [lang: string]: Translation;
  }

  export interface Translation {
    consentModal: {
      title: string;
      description: string;
    };
    consentNotice: {
      title: string;
      description: string;
      learnMore: string;
    };
    accept: string;
    acceptAll: string;
    decline: string;
    declineAll: string;
    close: string;
    purposes: {
      [key: string]: string;
    };
  }

  export function show(config: KlaroConfig): void;
}

import { KlaroConfig } from "klaro";

export const klaroConfig: KlaroConfig = {
  storageMethod: "cookie",
  storageName: "klaro",
  cookieExpiresAfterDays: 365,
  privacyPolicy: "/privacy",

  services: [
    {
      name: "google-analytics",
      default: false,
      purposes: ["analytics"],
      cookies: [
        [/^_ga/, "/", ""],
        [/^_gid/, "/", ""],
      ],
      translations: {
        zz: {
          title: "Google Analytics",
          description: "Google Analytics is a web analytics service offered by Google.",
        },
        pl: {
          title: "Google Analytics",
          description: "Google Analytics to usługa analityczna oferowana przez Google.",
        },
        en: {
          title: "Google Analytics",
          description: "Google Analytics is a web analytics service offered by Google.",
        },
      },
    },
  ],

  translations: {
    zz: {
      consentModal: {
        title: "Cookie Consent",
        description: "We use cookies to ensure you get the best experience on our website.",
      },
      consentNotice: {
        title: "Cookie Consent",
        description: "We use cookies to ensure you get the best experience on our website.",
        learnMore: "Learn more",
      },
      accept: "Accept",
      acceptAll: "Accept all",
      decline: "Decline",
      declineAll: "Decline all",
      close: "Close",
      purposes: {
        analytics: "Analytics",
      },
    },
    pl: {
      consentModal: {
        title: "Zgoda na cookies",
        description:
          "Używamy plików cookies, aby zapewnić Ci najlepsze doświadczenia na naszej stronie.",
      },
      consentNotice: {
        title: "Zgoda na cookies",
        description:
          "Używamy plików cookies, aby zapewnić Ci najlepsze doświadczenia na naszej stronie.",
        learnMore: "Dowiedz się więcej",
      },
      accept: "Akceptuj",
      acceptAll: "Akceptuj wszystkie",
      decline: "Odrzuć",
      declineAll: "Odrzuć wszystkie",
      close: "Zamknij",
      purposes: {
        analytics: "Analityka",
      },
    },
    en: {
      consentModal: {
        title: "Cookie Consent",
        description: "We use cookies to ensure you get the best experience on our website.",
      },
      consentNotice: {
        title: "Cookie Consent",
        description: "We use cookies to ensure you get the best experience on our website.",
        learnMore: "Learn more",
      },
      accept: "Accept",
      acceptAll: "Accept all",
      decline: "Decline",
      declineAll: "Decline all",
      close: "Close",
      purposes: {
        analytics: "Analytics",
      },
    },
  },
};

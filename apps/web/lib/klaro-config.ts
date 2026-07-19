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
    {
      name: "youtube",
      default: false,
      purposes: ["marketing"],
      cookies: [
        [/^VISITOR_INFO1_LIVE/, "/", ".youtube.com"],
        [/^YSC/, "/", ".youtube.com"],
        [/^PREF/, "/", ".youtube.com"],
        [/^CONSENT/, "/", ".youtube.com"],
      ],
      translations: {
        zz: {
          title: "YouTube",
          description:
            "YouTube is a video sharing platform that uses cookies for analytics and personalization.",
        },
        pl: {
          title: "YouTube",
          description:
            "YouTube to platforma udostępniania wideo, która używa plików cookies do analizy i personalizacji.",
        },
        en: {
          title: "YouTube",
          description:
            "YouTube is a video sharing platform that uses cookies for analytics and personalization.",
        },
      },
    },
    {
      name: "vimeo",
      default: false,
      purposes: ["marketing"],
      cookies: [
        [/^vuid/, "/", ".vimeo.com"],
        [/^__utma/, "/", ".vimeo.com"],
        [/^__utmb/, "/", ".vimeo.com"],
        [/^__utmc/, "/", ".vimeo.com"],
        [/^__utmz/, "/", ".vimeo.com"],
      ],
      translations: {
        zz: {
          title: "Vimeo",
          description:
            "Vimeo is a video hosting platform that uses cookies for analytics and performance.",
        },
        pl: {
          title: "Vimeo",
          description:
            "Vimeo to platforma hostingu wideo, która używa plików cookies do analizy i wydajności.",
        },
        en: {
          title: "Vimeo",
          description:
            "Vimeo is a video hosting platform that uses cookies for analytics and performance.",
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
        marketing: "Marketing",
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
        marketing: "Marketing",
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
        marketing: "Marketing",
      },
    },
  },
};

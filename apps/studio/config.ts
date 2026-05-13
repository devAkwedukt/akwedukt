export const LANGAUGE_FIELD = "locale";

type LanguageConfig = {
  id: string;
  title: string;
};

export const LANGUAGES: LanguageConfig[] = [
  { id: "pl", title: "PL" },
  { id: "en", title: "EN" },
];

type DocumentConfig = {
  _type: string;
  id?: string;
  intl?: boolean;
  singleton?: boolean;
  root?: boolean;
  path?: string;
  slug?: boolean;
};

// Please run `pnpm run singletons` to generate translation metadata pages when adding singleton types
export const DOCUMENTS: DocumentConfig[] = [
  { _type: "home", id: "home", intl: true, singleton: true, root: true },
  { _type: "oNas", id: "oNas", intl: true, singleton: true },
  { _type: "coNowego", id: "coNowego", intl: true, singleton: true },
  { _type: "coRobimy", id: "coRobimy", intl: true, singleton: true },
  { _type: "dlaRodzicow", id: "dlaRodzicow", intl: true, singleton: true },
  { _type: "volunteerWithUs", id: "volunteerWithUs", intl: true, singleton: true },
  { _type: "wspolpraca", id: "wspolpraca", intl: true, singleton: true },
  { _type: "wesprzyj", id: "wesprzyj", intl: true, singleton: true },
  { _type: "footer", id: "footer", singleton: true },
  { _type: "settings", id: "settings" },
  { _type: "post", intl: true, path: "/post", slug: true },
  { _type: "project", intl: true, path: "/project", slug: true },
  { _type: "author", intl: true },
];

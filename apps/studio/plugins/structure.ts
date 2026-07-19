import { StructureToolOptions } from "sanity/structure";
import { SingleLanguageSingleton as Singleton, TranslationMetadata as Translations } from "./intl";
import { SingleLanguageList as Collection } from "./intl";
import {
  ComposeIcon,
  HomeIcon,
  UsersIcon,
  CogIcon,
  TranslateIcon,
  ImagesIcon,
  DocumentIcon,
  DocumentsIcon,
  HeartIcon,
  BulbFilledIcon,
  EarthGlobeIcon,
  BookIcon,
  PresentationIcon,
  InfoOutlineIcon,
  ArchiveIcon,
  TagsIcon,
} from "@sanity/icons";

/**
 * Structure of the Sanity Studio
 * @see https://www.sanity.io/docs/studio/structure-tool
 */
export const structure: StructureToolOptions = {
  structure: (S) =>
    S.list()
      .id("content")
      .title("Content")
      .items([
        S.divider().title("Strony"),
        Singleton(S, { type: "home", title: "Strona główna", icon: HomeIcon }),
        Singleton(S, { type: "oNas", title: "O nas", icon: ImagesIcon }),
        Singleton(S, { type: "coNowego", title: "Co nowego", icon: BulbFilledIcon }),
        Singleton(S, { type: "coRobimy", title: "Co robimy", icon: CogIcon }),
        Singleton(S, { type: "dlaRodzicow", title: "Dla rodziców", icon: BookIcon }),
        Singleton(S, { type: "volunteerWithUs", title: "Volunteer With Us", icon: EarthGlobeIcon }),
        Singleton(S, { type: "wspolpraca", title: "Współpraca", icon: UsersIcon }),
        Singleton(S, { type: "edukator_ka", title: "Edukator_ka", icon: BookIcon }),
        Singleton(S, { type: "dlaInstytucji", title: "Dla instytucji", icon: PresentationIcon }),
        Singleton(S, { type: "wolontariat", title: "Wolontariat", icon: EarthGlobeIcon }),
        Singleton(S, { type: "wesprzyj", title: "Wsparcie", icon: HeartIcon }),
        Singleton(S, { type: "documents", title: "Dokumenty", icon: DocumentsIcon }),
        Singleton(S, { type: "privacyPolicy", title: "Polityka Prywatności ", icon: DocumentIcon }),
        Singleton(S, { type: "footer", title: "Stopka", icon: InfoOutlineIcon }),
        S.divider().title("Kolekcje"),
        Collection(S, { type: "project", title: "Projekty", icon: EarthGlobeIcon }),
        // NOWE KOLEKCJE (Z importów WP): - POSTY, AUTHOR, TAGS, CATEGORIES
        Collection(S, { type: "post", title: "Wpisy", icon: ComposeIcon }),
        Collection(S, { type: "category", title: "Kategorie", icon: BookIcon }),
        Collection(S, { type: "tag", title: "Tagi", icon: TagsIcon }),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: ArchiveIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
      ]),
};

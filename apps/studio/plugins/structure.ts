import { StructureToolOptions } from "sanity/structure";
import { SingleLanguageSingleton as Singleton, TranslationMetadata as Translations } from "./intl";
import { SingleLanguageList as Collection } from "./intl";
import {
  ComposeIcon,
  HomeIcon,
  UsersIcon,
  CogIcon,
  TranslateIcon,
  DocumentIcon,
  HeartIcon,
  BulbFilledIcon,
  EarthGlobeIcon,
  BookIcon,
  PresentationIcon,
  InfoOutlineIcon,
  ArchiveIcon,
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
        Singleton(S, { type: "oNas", title: "O nas", icon: DocumentIcon }),
        Singleton(S, { type: "coNowego", title: "Co nowego", icon: BulbFilledIcon }),
        Singleton(S, { type: "coRobimy", title: "Co robimy", icon: CogIcon }),
        Singleton(S, { type: "dlaRodzicow", title: "Dla rodziców", icon: BookIcon }),
        Singleton(S, { type: "volunteerWithUs", title: "Wolontariat", icon: EarthGlobeIcon }),
        Singleton(S, { type: "wspolpraca", title: "Współpraca", icon: UsersIcon }),
        Singleton(S, { type: "wesprzyj", title: "Wsparcie", icon: HeartIcon }),
        Singleton(S, { type: "footer", title: "Stopka", icon: InfoOutlineIcon }),
        S.divider().title("Kolekcje"),
        Collection(S, { type: "post", title: "Wpisy", icon: ComposeIcon }),
        Collection(S, { type: "project", title: "Projekty", icon: EarthGlobeIcon }),
        Collection(S, { type: "author", title: "Autorzy", icon: PresentationIcon }),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: ArchiveIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
      ]),
};

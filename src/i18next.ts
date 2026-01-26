import i18next from 'i18next';
// import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import {TranslationType} from "./translations/TranslationType.ts";
import en from "./translations/en.ts";
import ru from "./translations/ru.ts";

// i18next.use(LanguageDetector).init({
//   debug: true,
//   fallbackLng: 'en',
//   detection: {
//     order: ["localStorage", "navigator"],
//     caches: ["localStorage"],
//     lookupLocalStorage: "i18nextLng",
//   },
//   resources: {
//     en: en,
//     de: ru,
//   },
// });

export const availableTranslations = {
  en: {name: "English", translation: en},
  ru: {name: "Русский", translation: ru},
} as const;

export type languages = keyof typeof availableTranslations;

const resources: Record<string, { translation: TranslationType }> = availableTranslations

i18next
  .use(initReactI18next)
  .init({
    // debug: true,
    lng: "en",
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
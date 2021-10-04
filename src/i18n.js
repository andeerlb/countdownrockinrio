import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import TRANSLATIONS_EN from "./locales/en/translation";
import TRANSLATIONS_PT from "./locales/pt/translation";

const options = {
  fallbackLng: "pt-BR",
  debug: process.env.NODE_ENV === "development",
  resources: {
    pt: {
      translation: TRANSLATIONS_PT
    },
    en: {
      translation: TRANSLATIONS_EN
    }
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .init(options);
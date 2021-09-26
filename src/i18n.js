import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_PT } from "./locales/pt/translation";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     pt: {
       translation: TRANSLATIONS_PT
     }
   }
 });
 
i18n.changeLanguage("pt");
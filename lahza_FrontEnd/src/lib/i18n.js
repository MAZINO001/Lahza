<<<<<<< HEAD
// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translation.json";
import fr from "../locales/fr/translation.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
=======
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from "../locales/en/translation.json"
import frTranslation from "../locales/fr/translation.json"
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            fr: { translation: frTranslation },
        },
        fallbackLng: 'fr',
        debug: true,
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });


export default i18n;
>>>>>>> 7c16a5b5c48763730d9ca99f8b523a5f0ceab901

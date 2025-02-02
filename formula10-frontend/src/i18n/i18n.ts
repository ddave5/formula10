import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
        en: {
            translation: require('./en.json')
        },
        hu: {
            translation: require('./hu.json')
        },
        },
        lng: 'hu', // alapértelmezett nyelv
        fallbackLng: 'en',
        interpolation: {
        escapeValue: false, // React már biztonságosan kezeli a kódokat
        },
    });

export default i18n;
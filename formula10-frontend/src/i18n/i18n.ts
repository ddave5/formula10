import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './en.json';
import huTranslation from './hu.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
        en: {
            translation: enTranslation
        },
        hu: {
            translation: huTranslation
        },
        },
        lng: 'hu', 
        fallbackLng: 'en',
        interpolation: {
        escapeValue: false, 
        },
    });

export default i18n;
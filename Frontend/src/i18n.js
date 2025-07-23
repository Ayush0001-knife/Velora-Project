import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../src/locals/en.json';
import translationIT from '../src/locals/it.json';

const resources = {
  en: {
    translation: translationEN
  },
  it: {
    translation: translationIT
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to React
  .init({
    resources,
    fallbackLng: 'en', // Use English if user language is not available
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;

'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

// Convert our existing translations format to i18next format
const resources = {
  en: {
    translation: translations.en
  },
  de: {
    translation: translations.de
  },
  tr: {
    translation: translations.tr
  }
};

// Initialize i18next only on the client side
if (typeof window !== 'undefined') {
  i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      react: {
        useSuspense: false, // prevents issues with SSR
      },
    });
}

export default i18n; 
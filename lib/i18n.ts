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

// Initialize i18next with a basic configuration that works on both client and server
i18n
  .use(initReactI18next)
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

// Add language detector only on the client side
if (typeof window !== 'undefined') {
  i18n.use(LanguageDetector).init({
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });
}

export default i18n; 
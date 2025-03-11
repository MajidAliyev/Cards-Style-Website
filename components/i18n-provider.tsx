'use client';

import { useEffect } from 'react';
import '../lib/i18n'; // Import i18n configuration

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  // This component doesn't render anything special, it just ensures i18n is initialized
  return <>{children}</>;
} 
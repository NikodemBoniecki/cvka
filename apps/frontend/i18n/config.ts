/**
 * Internationalization configuration
 */

export const locales = ['pl', 'en', 'es', 'zh', 'ja', 'pt', 'fr', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
  pt: 'Português',
  fr: 'Français',
  ko: '한국어',
  pl: 'Polski',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  pt: '🇧🇷',
  fr: '🇫🇷',
  ko: '🇰🇷',
  pl: '🇵🇱',
};

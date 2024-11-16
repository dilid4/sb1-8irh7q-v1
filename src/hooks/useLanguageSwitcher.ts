import { useEffect } from 'react';
import { useLanguageStore } from '../lib/store/languageStore';

export function useLanguageSwitcher() {
  const languages = useLanguageStore((state) => state.languages);
  const currentLanguage = useLanguageStore((state) => 
    state.languages.find(lang => lang.isDefault)
  );

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language?.isActive) {
        document.documentElement.dir = language.direction;
        document.documentElement.lang = language.code;
      }
    }
  }, [languages]);

  const switchLanguage = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language?.isActive) {
      localStorage.setItem('preferredLanguage', languageCode);
      document.documentElement.dir = language.direction;
      document.documentElement.lang = language.code;
      // Trigger re-render of translated content
      window.dispatchEvent(new Event('languagechange'));
    }
  };

  return {
    currentLanguage,
    availableLanguages: languages.filter(lang => lang.isActive),
    switchLanguage
  };
}
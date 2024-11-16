import { useCallback } from 'react';
import { useLanguageStore } from '../store/languageStore';

export function useTranslation() {
  const translations = useLanguageStore((state) => state.translations);
  const languages = useLanguageStore((state) => state.languages);
  
  const currentLanguage = languages.find(lang => lang.isDefault)?.code || 'en';

  const t = useCallback((key: string, params: Record<string, string> = {}) => {
    const languageTranslations = translations[currentLanguage];
    if (!languageTranslations) return key;

    const translation = languageTranslations.find(t => t.key === key);
    if (!translation) return key;

    let text = translation.text[currentLanguage] || key;

    // Replace parameters in the translation string
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{{${param}}}`, value);
    });

    return text;
  }, [currentLanguage, translations]);

  return { t };
}
import { create } from 'zustand';
import { Language, Translation } from '../types/language';

interface LanguageState {
  languages: Language[];
  translations: Record<string, Translation[]>;
  setLanguages: (languages: Language[]) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (code: string, update: Partial<Language>) => void;
  removeLanguage: (code: string) => void;
  setTranslations: (languageCode: string, translations: Translation[]) => void;
  updateTranslation: (
    languageCode: string,
    key: string,
    text: string
  ) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  languages: [],
  translations: {},
  
  setLanguages: (languages) => set({ languages }),
  
  addLanguage: (language) =>
    set((state) => ({
      languages: [...state.languages, language]
    })),
  
  updateLanguage: (code, update) =>
    set((state) => ({
      languages: state.languages.map((lang) =>
        lang.code === code ? { ...lang, ...update } : lang
      )
    })),
  
  removeLanguage: (code) =>
    set((state) => ({
      languages: state.languages.filter((lang) => lang.code !== code)
    })),
  
  setTranslations: (languageCode, translations) =>
    set((state) => ({
      translations: {
        ...state.translations,
        [languageCode]: translations
      }
    })),
  
  updateTranslation: (languageCode, key, text) =>
    set((state) => ({
      translations: {
        ...state.translations,
        [languageCode]: state.translations[languageCode]?.map((t) =>
          t.key === key
            ? { ...t, text: { ...t.text, [languageCode]: text } }
            : t
        ) || []
      }
    }))
}));
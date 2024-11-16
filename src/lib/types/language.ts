export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isActive: boolean;
  isDefault: boolean;
  direction: 'ltr' | 'rtl';
  completionPercentage: number;
}

export interface Translation {
  key: string;
  group: string;
  text: Record<string, string>;
  lastUpdated: Date;
}

export interface TranslationGroup {
  name: string;
  description: string;
  totalKeys: number;
}
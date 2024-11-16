import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TranslationEditor from '../../components/admin/languages/TranslationEditor';
import { languageService } from '../../lib/services/languageService';

// Sample translation groups
const SAMPLE_GROUPS = [
  { name: 'common', description: 'Common translations', totalKeys: 50 },
  { name: 'auth', description: 'Authentication related', totalKeys: 20 },
  { name: 'trading', description: 'Trading platform', totalKeys: 100 },
];

// Sample translations
const SAMPLE_TRANSLATIONS = [
  {
    key: 'common.welcome',
    group: 'common',
    text: { en: 'Welcome', it: 'Benvenuto' },
    lastUpdated: new Date()
  },
  {
    key: 'common.login',
    group: 'common',
    text: { en: 'Login', it: 'Accedi' },
    lastUpdated: new Date()
  },
];

const TranslationsPage = () => {
  const { languageCode = 'en' } = useParams<{ languageCode: string }>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveTranslation = async (key: string, text: string) => {
    setIsSaving(true);
    try {
      await languageService.updateTranslation(languageCode, key, text);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Translations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage translations for {languageCode.toUpperCase()}
        </p>
      </div>

      <TranslationEditor
        languageCode={languageCode}
        translations={SAMPLE_TRANSLATIONS}
        groups={SAMPLE_GROUPS}
        onSave={handleSaveTranslation}
      />
    </div>
  );
};

export default TranslationsPage;
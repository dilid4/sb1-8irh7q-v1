import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageSwitcher } from '../hooks/useLanguageSwitcher';

const LanguageSwitcher = () => {
  const { currentLanguage, availableLanguages, switchLanguage } = useLanguageSwitcher();

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Globe className="h-4 w-4 mr-2" />
          {currentLanguage?.name || 'Select Language'}
        </button>
      </div>

      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
        <div className="py-1">
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={`
                w-full text-left px-4 py-2 text-sm
                ${currentLanguage?.code === language.code
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span className="font-medium">{language.name}</span>
              <span className="ml-2 text-gray-500">({language.nativeName})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
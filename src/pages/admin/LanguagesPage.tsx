import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import LanguageList from '../../components/admin/languages/LanguageList';
import AddLanguageModal from '../../components/admin/languages/AddLanguageModal';
import { Language } from '../../lib/types/language';

// Sample data - replace with API call
const SAMPLE_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isActive: true,
    isDefault: true,
    direction: 'ltr',
    completionPercentage: 100
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    isActive: true,
    isDefault: false,
    direction: 'ltr',
    completionPercentage: 85
  }
];

const LanguagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddLanguage = (language: Omit<Language, 'completionPercentage'>) => {
    console.log('Adding language:', language);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Languages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage platform languages and translations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <LanguageList languages={SAMPLE_LANGUAGES} />

      {showAddModal && (
        <AddLanguageModal
          onSubmit={handleAddLanguage}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default LanguagesPage;
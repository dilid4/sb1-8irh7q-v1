import React, { useState } from 'react';
import { Save, Search, Filter } from 'lucide-react';
import { Translation, TranslationGroup } from '../../../lib/types/language';

interface TranslationEditorProps {
  languageCode: string;
  translations: Translation[];
  groups: TranslationGroup[];
  onSave: (key: string, text: string) => Promise<void>;
}

const TranslationEditor: React.FC<TranslationEditorProps> = ({
  languageCode,
  translations,
  groups,
  onSave
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = searchTerm === '' || 
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.text[languageCode]?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleEdit = (translation: Translation) => {
    setEditingKey(translation.key);
    setEditingText(translation.text[languageCode] || '');
  };

  const handleSave = async (key: string) => {
    setIsSaving(true);
    try {
      await onSave(key, editingText);
      setEditingKey(null);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="sm:w-64">
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="all">All Groups</option>
              {groups.map(group => (
                <option key={group.name} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Translation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTranslations.map((translation) => (
                <tr key={translation.key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {translation.key}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingKey === translation.key ? (
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    ) : (
                      <span className="whitespace-pre-wrap">
                        {translation.text[languageCode] || ''}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {translation.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingKey === translation.key ? (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleSave(translation.key)}
                          disabled={isSaving}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingKey(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(translation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TranslationEditor;
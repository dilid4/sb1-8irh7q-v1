import React, { useState, useEffect } from 'react';
import { Edit2, Save } from 'lucide-react';
import { LeverageConfig } from '../../lib/types/leverage';
import { leverageService } from '../../lib/services/leverageService';

const LeverageSettingsPage = () => {
  const [configs, setConfigs] = useState<LeverageConfig[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const marketTypes = ['forex', 'crypto', 'stocks', 'indices'];
        const configPromises = marketTypes.map(type => 
          leverageService.getLeverageConfig(type)
        );
        const results = await Promise.all(configPromises);
        setConfigs(results.filter(Boolean) as LeverageConfig[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  const handleUpdate = async (config: LeverageConfig) => {
    try {
      await leverageService.updateLeverageConfig(config.marketType, {
        defaultValue: config.defaultValue,
        minLeverage: config.minLeverage,
        maxLeverage: config.maxLeverage,
      });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update leverage config:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leverage Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure leverage settings for different market types
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Default Leverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Leverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Leverage
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {configs.map((config) => (
                <tr key={config.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {config.marketType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === config.id ? (
                      <input
                        type="number"
                        value={config.defaultValue}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setConfigs(configs.map(c => 
                            c.id === config.id 
                              ? { ...c, defaultValue: value }
                              : c
                          ));
                        }}
                        className="w-24 px-2 py-1 border rounded-md"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {config.defaultValue}:1
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === config.id ? (
                      <input
                        type="number"
                        value={config.minLeverage}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setConfigs(configs.map(c => 
                            c.id === config.id 
                              ? { ...c, minLeverage: value }
                              : c
                          ));
                        }}
                        className="w-24 px-2 py-1 border rounded-md"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {config.minLeverage}:1
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === config.id ? (
                      <input
                        type="number"
                        value={config.maxLeverage}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setConfigs(configs.map(c => 
                            c.id === config.id 
                              ? { ...c, maxLeverage: value }
                              : c
                          ));
                        }}
                        className="w-24 px-2 py-1 border rounded-md"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {config.maxLeverage}:1
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === config.id ? (
                      <button
                        onClick={() => handleUpdate(config)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(config.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-5 w-5" />
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

export default LeverageSettingsPage;
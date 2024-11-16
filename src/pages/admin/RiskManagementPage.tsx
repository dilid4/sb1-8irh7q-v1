import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { RiskSettings, RiskSettingsUpdate } from '../../lib/types/riskManagement';

// Sample data - replace with API call
const INITIAL_SETTINGS: RiskSettings = {
  id: '1',
  stopOutLevel: 50,
  marginCallLevel: 100,
  warningLevel: 120,
  maxPositionSize: {
    forex: 100,
    crypto: 10,
    stocks: 50,
    indices: 20
  },
  maxDrawdown: 75,
  maxLeverage: {
    forex: 500,
    crypto: 100,
    stocks: 20,
    indices: 200
  },
  isActive: true,
  updatedAt: new Date(),
  updatedBy: 'admin'
};

const RiskManagementPage = () => {
  const [settings, setSettings] = useState<RiskSettings>(INITIAL_SETTINGS);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save settings
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = (update: RiskSettingsUpdate) => {
    setSettings(prev => ({
      ...prev,
      ...update,
      updatedAt: new Date()
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Management Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure global risk management parameters
          </p>
        </div>
        {isEditing ? (
          <div className="space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Edit Settings
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Margin Levels */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Margin Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stop-out Level (%)
              </label>
              <input
                type="number"
                value={settings.stopOutLevel}
                onChange={(e) => handleUpdate({ stopOutLevel: Number(e.target.value) })}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
              />
              <p className="mt-1 text-sm text-red-600">
                Positions will be automatically closed below this level
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Margin Call Level (%)
              </label>
              <input
                type="number"
                value={settings.marginCallLevel}
                onChange={(e) => handleUpdate({ marginCallLevel: Number(e.target.value) })}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
              />
              <p className="mt-1 text-sm text-orange-600">
                New positions will be blocked below this level
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warning Level (%)
              </label>
              <input
                type="number"
                value={settings.warningLevel}
                onChange={(e) => handleUpdate({ warningLevel: Number(e.target.value) })}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
              />
              <p className="mt-1 text-sm text-yellow-600">
                Users will receive warnings below this level
              </p>
            </div>
          </div>
        </div>

        {/* Position Size Limits */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maximum Position Size (Lots)</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(settings.maxPositionSize).map(([market, size]) => (
              <div key={market}>
                <label className="block text-sm font-medium text-gray-700">
                  {market.charAt(0).toUpperCase() + market.slice(1)}
                </label>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => handleUpdate({
                    maxPositionSize: {
                      ...settings.maxPositionSize,
                      [market]: Number(e.target.value)
                    }
                  })}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Maximum Leverage */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maximum Leverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(settings.maxLeverage).map(([market, leverage]) => (
              <div key={market}>
                <label className="block text-sm font-medium text-gray-700">
                  {market.charAt(0).toUpperCase() + market.slice(1)}
                </label>
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => handleUpdate({
                    maxLeverage: {
                      ...settings.maxLeverage,
                      [market]: Number(e.target.value)
                    }
                  })}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Maximum Drawdown */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maximum Drawdown</h3>
          <div className="max-w-xs">
            <div className="flex items-center">
              <input
                type="number"
                value={settings.maxDrawdown}
                onChange={(e) => handleUpdate({ maxDrawdown: Number(e.target.value) })}
                disabled={!isEditing}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-50"
              />
              <span className="ml-2 text-gray-500">%</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Maximum allowed account drawdown before trading is restricted
            </p>
          </div>
        </div>

        {/* Warning Message */}
        <div className="p-6 bg-yellow-50">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Changes to these settings will affect all trading accounts. Please ensure you understand
                the implications before modifying any values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementPage;
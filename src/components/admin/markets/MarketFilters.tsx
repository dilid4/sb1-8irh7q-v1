import React from 'react';
import { X } from 'lucide-react';

interface MarketFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  onClose: () => void;
}

const MarketFilters: React.FC<MarketFiltersProps> = ({
  selectedType,
  onTypeChange,
  onClose
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Market Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="forex">Forex</option>
            <option value="crypto">Crypto</option>
            <option value="stocks">Stocks</option>
            <option value="indices">Indices</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Types
          </label>
          <div className="mt-2 space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Standard</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">VIP</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Manager</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
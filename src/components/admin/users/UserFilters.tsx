import React from 'react';
import { X } from 'lucide-react';
import { UserFilter } from '../../../lib/types/admin';

interface UserFiltersProps {
  filters: UserFilter;
  onChange: (filters: UserFilter) => void;
  onClose: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ filters, onChange, onClose }) => {
  const handleChange = (key: keyof UserFilter, value: string) => {
    onChange({ ...filters, [key]: value === 'all' ? undefined : value });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleChange('status', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            value={filters.accountType || 'all'}
            onChange={(e) => handleChange('accountType', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            <option value="standard">Standard</option>
            <option value="vip">VIP</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            KYC Status
          </label>
          <select
            value={filters.kycStatus || 'all'}
            onChange={(e) => handleChange('kycStatus', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Money Manager
          </label>
          <select
            value={filters.moneyManager || 'all'}
            onChange={(e) => handleChange('moneyManager', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
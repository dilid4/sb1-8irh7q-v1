import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import UserList from '../../components/admin/users/UserList';
import UserFilters from '../../components/admin/users/UserFilters';
import { UserFilter, UserSort, AdminUser } from '../../lib/types/admin';

// Sample data - replace with actual API call
const SAMPLE_USERS: AdminUser[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    accountType: 'standard',
    balance: 10000,
    bonus: 100,
    registeredAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-03-01'),
    kycStatus: 'approved'
  },
  // Add more sample users...
];

const UsersPage = () => {
  const [filters, setFilters] = useState<UserFilter>({});
  const [sort, setSort] = useState<UserSort>({ field: 'registeredAt', direction: 'desc' });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting users...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor user accounts
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <UserFilters
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      <UserList
        users={SAMPLE_USERS}
        sort={sort}
        onSort={setSort}
      />
    </div>
  );
};

export default UsersPage;
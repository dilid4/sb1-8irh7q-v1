import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import MarketGroupsList from '../../components/admin/markets/MarketGroupsList';
import CreateMarketGroupModal from '../../components/admin/markets/CreateMarketGroupModal';
import { useMarketGroups } from '../../hooks/useMarketGroups';

const MarketGroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { groups, isLoading, error, createGroup, updateGroup, deleteGroup } = useMarketGroups();

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Market Groups</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage market categories and groupings
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search market groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          {error}
        </div>
      )}

      <MarketGroupsList
        groups={filteredGroups}
        onUpdate={updateGroup}
        onDelete={deleteGroup}
        isLoading={isLoading}
      />

      {showCreateModal && (
        <CreateMarketGroupModal
          onSubmit={createGroup}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default MarketGroupsPage;
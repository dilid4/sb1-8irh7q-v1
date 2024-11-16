import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import ClientList from '../../components/manager/clients/ClientList';
import ClientFilters from '../../components/manager/clients/ClientFilters';
import { Client } from '../../lib/types/moneyManager';

// Sample data - replace with actual API call
const SAMPLE_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    balance: 10000,
    equity: 10250,
    openPositions: 3,
    totalPnL: 250,
    lastActivity: new Date('2024-03-01')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    balance: 25000,
    equity: 24800,
    openPositions: 5,
    totalPnL: -200,
    lastActivity: new Date('2024-03-02')
  }
];

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting client data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your client accounts
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
            placeholder="Search clients..."
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
        <ClientFilters onClose={() => setShowFilters(false)} />
      )}

      <ClientList clients={SAMPLE_CLIENTS} />
    </div>
  );
};

export default ClientsPage;
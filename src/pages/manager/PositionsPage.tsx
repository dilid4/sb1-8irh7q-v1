import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PositionsList from '../../components/manager/positions/PositionsList';
import { Position } from '../../lib/types/trading';

// Sample data - replace with API call
const SAMPLE_POSITIONS: Position[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'BUY',
    openPrice: 1.09250,
    currentPrice: 1.09350,
    lots: 0.1,
    takeProfit: 1.09500,
    stopLoss: 1.09000,
    swap: -0.23,
    commission: -0.50,
    profitLoss: 10.00,
    openTime: new Date()
  },
  {
    id: '2',
    symbol: 'GBP/USD',
    type: 'SELL',
    openPrice: 1.26450,
    currentPrice: 1.26350,
    lots: 0.2,
    takeProfit: 1.26200,
    stopLoss: 1.26700,
    swap: -0.45,
    commission: -1.00,
    profitLoss: 20.00,
    openTime: new Date()
  }
];

const PositionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handlePositionUpdate = () => {
    // Refresh positions data
    console.log('Refreshing positions...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Positions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor all client positions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search positions..."
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

      <PositionsList
        positions={SAMPLE_POSITIONS}
        onPositionUpdate={handlePositionUpdate}
      />
    </div>
  );
};

export default PositionsPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import MarketGroup from '../components/markets/MarketGroup';
import { MarketGroup as MarketGroupType } from '../lib/types/market';

const SAMPLE_DATA: MarketGroupType[] = [
  {
    title: 'Popular Forex Pairs',
    type: 'forex',
    description: 'Major currency pairs with high liquidity',
    markets: [
      {
        symbol: 'EUR/USD',
        name: 'Euro / US Dollar',
        price: 1.0925,
        change: 0.0015,
        changePercent: 0.14,
        high: 1.0940,
        low: 1.0910,
        volume: 125430,
        type: 'forex'
      },
      // Add more forex pairs...
    ]
  },
  {
    title: 'Top Cryptocurrencies',
    type: 'crypto',
    description: 'Most traded digital assets',
    markets: [
      {
        symbol: 'BTC/USD',
        name: 'Bitcoin / US Dollar',
        price: 43250.75,
        change: -125.25,
        changePercent: -0.29,
        high: 43500.00,
        low: 43000.00,
        volume: 12543,
        type: 'crypto'
      },
      // Add more crypto pairs...
    ]
  }
  // Add more market groups...
];

const MarketsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarketClick = (symbol: string) => {
    navigate(`/trade/${symbol.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Markets</h1>
            <p className="mt-2 text-gray-500">
              Explore and trade various financial instruments with competitive spreads
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Market Groups */}
          <div className="space-y-12">
            {SAMPLE_DATA.map((group) => (
              <MarketGroup
                key={group.type}
                group={group}
                onMarketClick={handleMarketClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;
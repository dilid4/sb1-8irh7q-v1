import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MarketData } from '../../lib/types/market';

const popularMarkets: MarketData[] = [
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
  }
];

const QuickTrade = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Quick Trade</h2>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Popular Markets</h3>
          <div className="mt-2 space-y-2">
            {popularMarkets.map((market) => (
              <button
                key={market.symbol}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{market.symbol}</p>
                  <p className="text-xs text-gray-500">{market.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${market.price.toFixed(market.type === 'forex' ? 4 : 2)}
                  </p>
                  <p className={`text-xs ${
                    market.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {market.change >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTrade;
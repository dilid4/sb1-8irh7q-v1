import React from 'react';
import { Switch } from '@headlessui/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../../../lib/types/market';

interface MarketsListProps {
  markets: MarketData[];
  onToggleMarket: (symbol: string, isActive: boolean) => Promise<void>;
  isLoading: boolean;
}

const MarketsList: React.FC<MarketsListProps> = ({ markets, onToggleMarket, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {markets.map((market) => (
              <tr key={market.symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {market.symbol}
                  </div>
                  <div className="text-sm text-gray-500">
                    {market.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {market.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${market.price.toFixed(market.type === 'forex' ? 5 : 2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {market.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      market.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {market.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {market.volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Switch
                    checked={market.isActive}
                    onChange={(checked) => onToggleMarket(market.symbol, checked)}
                    className={`${
                      market.isActive ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable market</span>
                    <span
                      className={`${
                        market.isActive ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketsList;
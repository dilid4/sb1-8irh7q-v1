import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketGroup as MarketGroupType } from '../../lib/types/market';
import MarketCard from './MarketCard';

interface MarketGroupProps {
  group: MarketGroupType;
  onMarketClick: (symbol: string) => void;
}

const MarketGroup: React.FC<MarketGroupProps> = ({ group, onMarketClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{group.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{group.description}</p>
        </div>
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.markets.map((market) => (
          <MarketCard
            key={market.symbol}
            market={market}
            onClick={() => onMarketClick(market.symbol)}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketGroup;
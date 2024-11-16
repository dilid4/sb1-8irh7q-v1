import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MarketData } from '../../lib/types/market';

interface MarketGroup {
  title: string;
  type: string;
  markets: MarketData[];
  count?: number;
}

interface MarketGroupsProps {
  groups: MarketGroup[];
  onSelectMarket: (symbol: string) => void;
  selectedSymbol?: string;
}

const MarketGroups: React.FC<MarketGroupsProps> = ({ groups, onSelectMarket, selectedSymbol }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Forex': true // Default expanded
  });

  const toggleGroup = (type: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="h-full overflow-y-auto">
      {groups.map((group) => (
        <div key={group.type} className="border-b border-gray-200">
          <button
            onClick={() => toggleGroup(group.type)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center">
              {expandedGroups[group.type] ? (
                <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
              )}
              <span className="text-sm font-medium text-gray-900">{group.title}</span>
              {group.count && (
                <span className="ml-2 text-xs text-gray-500">({group.count})</span>
              )}
            </div>
          </button>
          
          {expandedGroups[group.type] && (
            <div className="divide-y divide-gray-100">
              {group.markets.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => onSelectMarket(market.symbol)}
                  className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 ${
                    selectedSymbol === market.symbol ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">
                      {market.symbol}
                    </span>
                    <span className="text-xs text-gray-500">{market.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {market.price.toFixed(market.type === 'forex' ? 5 : 2)}
                    </div>
                    <div className={`text-xs ${
                      market.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {market.change >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketGroups;
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketGroups } from '../../hooks/useMarketGroups';
import { MarketData } from '../../lib/types/market';

interface MarketListProps {
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

const MarketList: React.FC<MarketListProps> = ({
  selectedSymbol,
  onSelectSymbol
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const { groups, isLoading } = useMarketGroups();

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const renderMarket = (market: MarketData) => (
    <button
      key={market.symbol}
      onClick={() => onSelectSymbol(market.symbol)}
      className={`w-full px-4 py-3 flex items-center justify-between text-sm ${
        selectedSymbol === market.symbol ? 'bg-blue-50' : 'hover:bg-gray-100'
      }`}
    >
      <div>
        <div className="font-medium text-gray-900">{market.symbol}</div>
        <div className="text-xs text-gray-500">{market.name}</div>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">{market.price}</div>
        <div className="flex items-center text-xs">
          {market.change >= 0 ? (
            <>
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+{market.change}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-600">{market.change}%</span>
            </>
          )}
        </div>
      </div>
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Market Groups */}
      <div className="flex-1 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleGroup(group.id)}
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                group.type === 'forex' ? 'bg-green-50' :
                group.type === 'crypto' ? 'bg-orange-50' :
                group.type === 'indices' ? 'bg-blue-50' :
                'bg-gray-50'
              }`}
              style={{
                backgroundImage: `url(${group.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{group.name}</span>
                {group.markets.length > 0 && (
                  <span className="ml-2 text-xs text-gray-500">({group.markets.length})</span>
                )}
              </div>
              {expandedGroups[group.id] ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {expandedGroups[group.id] && (
              <div className="bg-gray-50">
                {group.markets
                  .filter(market => 
                    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    market.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(renderMarket)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketList;
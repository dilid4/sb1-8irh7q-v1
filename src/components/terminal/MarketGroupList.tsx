import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData, MarketGroup } from '../../lib/types/market';

interface MarketGroupListProps {
  groups: MarketGroup[];
  markets: MarketData[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

const MarketGroupList: React.FC<MarketGroupListProps> = ({
  groups,
  markets,
  selectedSymbol,
  onSelectSymbol
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const filteredGroups = groups
    .filter(group => group.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const getGroupMarkets = (groupId: string) => 
    markets.filter(market => market.groupId === groupId && market.isActive);

  const renderMarket = (market: MarketData) => (
    <button
      key={market.symbol}
      onClick={() => onSelectSymbol(market.symbol)}
      className={`w-full px-4 py-3 flex items-center justify-between text-sm ${
        selectedSymbol === market.symbol ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <div>
        <div className="font-medium text-gray-900">{market.symbol}</div>
        <div className="text-xs text-gray-500">{market.name}</div>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">{market.price.toFixed(market.type === 'forex' ? 5 : 2)}</div>
        <div className={`flex items-center text-xs ${
          market.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {market.change >= 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          <span>{market.change >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%</span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search markets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto">
        {filteredGroups.map((group) => {
          const groupMarkets = getGroupMarkets(group.id)
            .filter(market => 
              market.symbol.toLowerCase().includes(searchTerm) ||
              market.name.toLowerCase().includes(searchTerm)
            );

          if (groupMarkets.length === 0 && searchTerm) return null;

          return (
            <div key={group.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${group.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex items-center text-white">
                  <span className="font-medium">{group.name}</span>
                  <span className="ml-2 text-sm opacity-75">
                    ({groupMarkets.length})
                  </span>
                </div>
                {expandedGroups[group.id] ? (
                  <ChevronDown className="h-5 w-5 text-white" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-white" />
                )}
              </button>

              {expandedGroups[group.id] && (
                <div className="bg-white">
                  {groupMarkets.map(renderMarket)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketGroupList;
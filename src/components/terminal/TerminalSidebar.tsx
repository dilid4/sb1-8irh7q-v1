import React, { useState } from 'react';
import { Menu, Star, Flame } from 'lucide-react';
import { marketCategories } from '../../data/marketCategories';

interface TerminalSidebarProps {
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

const TerminalSidebar: React.FC<TerminalSidebarProps> = ({
  selectedSymbol,
  onSelectSymbol
}) => {
  const [activeTab, setActiveTab] = useState('trading');
  const [activeFilter, setActiveFilter] = useState('discover');

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Vertical Navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`flex-1 p-4 text-sm font-medium ${
            activeTab === 'trading' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('trading')}
        >
          <Menu className="h-5 w-5 mb-1" />
          <span>Trading</span>
        </button>
        {/* Add other vertical tabs */}
      </div>

      {/* Quick Filters */}
      <div className="p-4 space-y-2">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            New!
          </span>
          <span className="inline-flex items-center text-orange-500">
            <Flame className="h-4 w-4 mr-1" />
            Hot
          </span>
          <span className="inline-flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1" />
            Popular
          </span>
        </div>

        {/* Sub Navigation */}
        <div className="flex space-x-4 border-b border-gray-200 pb-2">
          <button 
            className={`text-sm font-medium ${
              activeFilter === 'discover' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveFilter('discover')}
          >
            Discover
          </button>
          <button 
            className={`text-sm font-medium ${
              activeFilter === 'watchlists' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveFilter('watchlists')}
          >
            Watchlists
          </button>
        </div>
      </div>

      {/* Market Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-sm text-gray-500 mb-4">
          Find an instrument by navigating our categories
        </p>

        {marketCategories.map((category) => (
          <button
            key={category.id}
            className="w-full h-16 rounded-lg relative overflow-hidden group"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${category.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => onSelectSymbol(category.defaultSymbol)}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10 p-4 flex items-center justify-between">
              <span className="text-white font-medium">{category.name}</span>
              {category.count && (
                <span className="text-white text-sm">({category.count})</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerminalSidebar;
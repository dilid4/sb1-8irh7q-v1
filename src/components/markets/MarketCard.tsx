import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../../lib/types/market';

interface MarketCardProps {
  market: MarketData;
  onClick?: () => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const isPositive = market.change >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{market.symbol}</h3>
          <p className="text-sm text-gray-500">{market.name}</p>
        </div>
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            ${market.price.toFixed(2)}
          </p>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{market.change.toFixed(2)} ({market.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            <div>H: ${market.high.toFixed(2)}</div>
            <div>L: ${market.low.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Volume</span>
          <span>{market.volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
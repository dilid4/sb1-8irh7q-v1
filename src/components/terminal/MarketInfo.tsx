import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketInfoProps {
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  high: number;
  low: number;
}

const MarketInfo: React.FC<MarketInfoProps> = ({
  symbol,
  bid,
  ask,
  change,
  high,
  low
}) => {
  const spread = (ask - bid).toFixed(5);

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{symbol}</h2>
          <div className="mt-1 flex items-center">
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">Spread: {spread}</div>
          <div className="mt-1 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">High</div>
              <div className="font-medium">{high.toFixed(5)}</div>
            </div>
            <div>
              <div className="text-gray-500">Low</div>
              <div className="font-medium">{low.toFixed(5)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfo;
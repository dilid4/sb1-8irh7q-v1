import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Position } from '../../lib/types/trading';

const SAMPLE_POSITIONS: Position[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'BUY',
    openPrice: 1.09250,
    currentPrice: 1.09350,
    lots: 0.1,
    takeProfit: 1.09500,
    stopLoss: 1.09000,
    swap: -0.23,
    commission: -0.50,
    profitLoss: 10.00,
    openTime: new Date()
  }
];

const ActivePositions = () => {
  if (SAMPLE_POSITIONS.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">No active positions</p>
        <Link
          to="/terminal"
          className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          Open new position
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {SAMPLE_POSITIONS.map((position) => (
        <div
          key={position.id}
          className="p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{position.symbol}</h3>
              <span className={`inline-flex items-center text-xs font-medium ${
                position.type === 'BUY' ? 'text-green-600' : 'text-red-600'
              }`}>
                {position.type === 'BUY' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {position.type} {position.lots}
              </span>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${position.profitLoss.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {position.openPrice} → {position.currentPrice}
              </p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <span>Take Profit: </span>
              <span className="font-medium">{position.takeProfit}</span>
            </div>
            <div>
              <span>Stop Loss: </span>
              <span className="font-medium">{position.stopLoss}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivePositions;
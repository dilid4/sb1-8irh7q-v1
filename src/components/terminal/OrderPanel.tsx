import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface OrderPanelProps {
  symbol: string;
  bid?: number;
  ask?: number;
  balance: number;
}

const OrderPanel: React.FC<OrderPanelProps> = ({
  symbol,
  bid = 0,
  ask = 0,
  balance = 0
}) => {
  const [volume, setVolume] = useState(1);
  const [timeInForce, setTimeInForce] = useState('Good Till Cancelled');

  // Format prices safely
  const formatPrice = (price: number | undefined) => (price || 0).toFixed(5);
  const formatBalance = (num: number) => (num || 0).toLocaleString();

  return (
    <div className="w-80 border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Trade {symbol}</h2>
          <div className="text-sm text-gray-500">
            Usable Margin: ${formatBalance(balance)}
          </div>
        </div>

        <div className="space-y-4">
          {/* Market/Entry selector */}
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
              Market
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md">
              Entry
            </button>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount(K)
            </label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              min={0.01}
              step={0.01}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Time in Force */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time in Force
            </label>
            <button className="w-full px-3 py-2 text-left border border-gray-300 rounded-md flex items-center justify-between">
              <span>{timeInForce}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Trade buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4">
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              disabled={!bid}
            >
              Sell {formatPrice(bid)}
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!ask}
            >
              Buy {formatPrice(ask)}
            </button>
          </div>

          {/* Trade info */}
          <div className="text-sm text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Per Pip:</span>
              <span>0.08</span>
            </div>
            <div className="flex justify-between">
              <span>Required Margin:</span>
              <span>33.30</span>
            </div>
            <div className="flex justify-between">
              <span>Commission:</span>
              <span>0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
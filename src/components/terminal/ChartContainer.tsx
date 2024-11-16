import React from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import TradingViewChart from './TradingViewChart';

interface ChartContainerProps {
  id: string;
  symbol: string;
  isMaximized?: boolean;
  onClose: () => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  id,
  symbol,
  isMaximized,
  onClose
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900">{symbol}</span>
        </div>
        <div className="flex items-center space-x-2">
          {isMaximized ? (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Minimize2 className="h-4 w-4 text-gray-500" />
            </button>
          ) : (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Maximize2 className="h-4 w-4 text-gray-500" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <TradingViewChart
          symbol={symbol}
          container={`chart-${id}`}
        />
      </div>
    </div>
  );
};

export default ChartContainer;
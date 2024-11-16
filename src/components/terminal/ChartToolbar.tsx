import React from 'react';
import { Pencil, BarChart, Settings, BarChart2 } from 'lucide-react';

interface ChartToolbarProps {
  symbol: string;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const ChartToolbar: React.FC<ChartToolbarProps> = ({
  symbol,
  timeframe,
  onTimeframeChange
}) => {
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1D', '1W', '1M'];

  return (
    <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded">
          <Pencil className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <BarChart className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <BarChart2 className="h-4 w-4 text-gray-600" />
        </button>
        <div className="h-5 w-px bg-gray-200 mx-2" />
        <div className="flex items-center space-x-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-sm rounded ${
                timeframe === tf
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <button className="p-2 hover:bg-gray-100 rounded">
        <Settings className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
};

export default ChartToolbar;
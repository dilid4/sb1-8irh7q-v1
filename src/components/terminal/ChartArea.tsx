import React, { useState } from 'react';
import { Grid, Maximize2, Minimize2, Plus } from 'lucide-react';
import TradingViewChart from './TradingViewChart';

interface ChartAreaProps {
  symbol: string;
}

const ChartArea: React.FC<ChartAreaProps> = ({ symbol }) => {
  const [layout, setLayout] = useState<'single' | '2x2'>('single');
  const [charts, setCharts] = useState([{ id: '1', symbol }]);

  const toggleLayout = () => {
    if (layout === 'single') {
      setLayout('2x2');
      setCharts([
        { id: '1', symbol },
        { id: '2', symbol },
        { id: '3', symbol },
        { id: '4', symbol }
      ]);
    } else {
      setLayout('single');
      setCharts([{ id: '1', symbol }]);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleLayout}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <Grid className="h-5 w-5 text-gray-600" />
          </button>
          {layout === 'single' ? (
            <button
              onClick={() => setLayout('2x2')}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
          ) : (
            <button
              onClick={() => setLayout('single')}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              <Minimize2 className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className={`grid gap-4 h-[calc(100%-3rem)] ${
        layout === 'single' ? '' : 'grid-cols-2 grid-rows-2'
      }`}>
        {charts.map((chart) => (
          <div key={chart.id} className="bg-white rounded-lg shadow-sm">
            <TradingViewChart symbol={chart.symbol} container={`chart-${chart.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartArea;
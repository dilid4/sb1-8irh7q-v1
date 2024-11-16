import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Plus } from 'lucide-react';
import ChartContainer from './ChartContainer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Chart {
  id: string;
  symbol: string;
  isMaximized?: boolean;
}

interface ChartGridProps {
  charts: Chart[];
  onAddChart: () => void;
  onRemoveChart: (id: string) => void;
}

const ChartGrid: React.FC<ChartGridProps> = ({
  charts,
  onAddChart,
  onRemoveChart
}) => {
  const [layouts, setLayouts] = useState({
    lg: charts.map((chart, i) => ({
      i: chart.id,
      x: (i % 2) * 6,
      y: Math.floor(i / 2) * 6,
      w: 6,
      h: 6,
      minW: 3,
      minH: 3
    }))
  });

  const handleLayoutChange = (layout: any[], allLayouts: any) => {
    setLayouts(allLayouts);
  };

  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Charts</h2>
        <button
          onClick={onAddChart}
          className="p-2 rounded-md hover:bg-gray-200 flex items-center"
        >
          <Plus className="h-5 w-5 text-gray-600 mr-1" />
          <span className="text-sm text-gray-600">Add Chart</span>
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={30}
        margin={[10, 10]}
        onLayoutChange={handleLayoutChange}
        isDraggable
        isResizable
      >
        {charts.map((chart) => (
          <div key={chart.id} className="bg-white rounded-lg shadow-sm">
            <ChartContainer
              key={`container-${chart.id}`}
              id={chart.id}
              symbol={chart.symbol}
              onClose={() => onRemoveChart(chart.id)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default ChartGrid;
import React from 'react';
import { LineChart, TrendingUp, TrendingDown } from 'lucide-react';

const MarketAnalysisPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-medium text-gray-900">Market Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Technical Analysis Summary */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900">Technical Analysis</h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Signal</span>
              <span className="text-sm font-medium text-green-600">Strong Buy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Moving Averages</span>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">Buy (12)</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Technical Indicators</span>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">Buy (8)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Market Sentiment</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Buyers</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Sellers</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional analysis components can be added here */}
      </div>
    </div>
  );
};

export default MarketAnalysisPage;
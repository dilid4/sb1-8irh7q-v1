import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, AlertTriangle } from 'lucide-react';
import { ManagerPerformance } from '../../../lib/types/moneyManager';

interface PerformanceMetricsProps {
  performance: ManagerPerformance;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ performance }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
        
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Win Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.winRate.toFixed(1)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart2 className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profit Factor
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.profitFactor.toFixed(2)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingDown className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Max Drawdown
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.maxDrawdown.toFixed(2)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sharpe Ratio
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.sharpeRatio.toFixed(2)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Average Trade</h4>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-700">
                  Win: ${performance.averageWin.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm font-medium text-red-700">
                  Loss: ${Math.abs(performance.averageLoss).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
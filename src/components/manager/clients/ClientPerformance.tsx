import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface Performance {
  winRate: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  totalTrades: number;
  profitableTrades: number;
}

interface ClientPerformanceProps {
  performance: Performance;
}

const ClientPerformance: React.FC<ClientPerformanceProps> = ({ performance }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Win Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.winRate}%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {performance.profitableTrades}/{performance.totalTrades}
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
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profit Factor
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {performance.profitFactor}
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
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Trade
                    </dt>
                    <dd className="flex flex-col">
                      <div className="text-sm font-medium text-green-600">
                        Win: ${performance.averageWin}
                      </div>
                      <div className="text-sm font-medium text-red-600">
                        Loss: ${performance.averageLoss}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPerformance;
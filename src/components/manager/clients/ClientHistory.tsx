import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  openPrice: number;
  closePrice: number;
  lots: number;
  profit: number;
  openTime: Date;
  closeTime: Date;
}

interface ClientHistoryProps {
  clientId: string;
}

// Sample data - replace with API call
const SAMPLE_TRADES: Trade[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'BUY',
    openPrice: 1.09250,
    closePrice: 1.09350,
    lots: 0.1,
    profit: 10,
    openTime: new Date('2024-03-01T10:00:00'),
    closeTime: new Date('2024-03-01T14:00:00')
  },
  {
    id: '2',
    symbol: 'GBP/USD',
    type: 'SELL',
    openPrice: 1.26450,
    closePrice: 1.26350,
    lots: 0.2,
    profit: 20,
    openTime: new Date('2024-03-01T11:00:00'),
    closeTime: new Date('2024-03-01T15:00:00')
  }
];

const ClientHistory: React.FC<ClientHistoryProps> = ({ clientId }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Trading History</h3>
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lots
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry/Exit
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {SAMPLE_TRADES.map((trade) => (
                  <tr key={trade.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {trade.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`flex items-center ${
                        trade.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.type === 'BUY' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trade.lots}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{trade.openPrice.toFixed(5)}</div>
                      <div>{trade.closePrice.toFixed(5)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${trade.profit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.round((trade.closeTime.getTime() - trade.openTime.getTime()) / (1000 * 60))} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHistory;
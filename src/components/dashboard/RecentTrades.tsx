import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SAMPLE_TRADES = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'BUY',
    openPrice: 1.09250,
    closePrice: 1.09350,
    profit: 100,
    volume: 0.1,
    closeTime: new Date('2024-03-05T14:30:00')
  },
  {
    id: '2',
    symbol: 'BTC/USD',
    type: 'SELL',
    openPrice: 43250.75,
    closePrice: 43150.25,
    profit: 100.50,
    volume: 0.01,
    closeTime: new Date('2024-03-05T14:15:00')
  }
];

const RecentTrades = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entry/Exit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              P/L
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Close Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {SAMPLE_TRADES.map((trade) => (
            <tr key={trade.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {trade.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`flex items-center text-sm ${
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
                {trade.volume}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{trade.openPrice}</div>
                <div className="text-sm text-gray-500">{trade.closePrice}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-medium ${
                  trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${trade.profit.toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {trade.closeTime.toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrades;
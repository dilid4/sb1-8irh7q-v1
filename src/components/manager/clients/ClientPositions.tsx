import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  openPrice: number;
  currentPrice: number;
  lots: number;
  profit: number;
  openTime: Date;
}

interface ClientPositionsProps {
  clientId: string;
}

// Sample data - replace with API call
const SAMPLE_POSITIONS: Position[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'BUY',
    openPrice: 1.09250,
    currentPrice: 1.09350,
    lots: 0.1,
    profit: 10,
    openTime: new Date('2024-03-01T10:00:00')
  },
  {
    id: '2',
    symbol: 'GBP/USD',
    type: 'SELL',
    openPrice: 1.26450,
    currentPrice: 1.26350,
    lots: 0.2,
    profit: 20,
    openTime: new Date('2024-03-01T11:00:00')
  }
];

const ClientPositions: React.FC<ClientPositionsProps> = ({ clientId }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Open Positions</h3>
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
                    Open Price
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {SAMPLE_POSITIONS.map((position) => (
                  <tr key={position.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {position.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`flex items-center ${
                        position.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {position.type === 'BUY' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {position.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {position.lots}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {position.openPrice.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {position.currentPrice.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={position.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${position.profit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {position.openTime.toLocaleString()}
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

export default ClientPositions;
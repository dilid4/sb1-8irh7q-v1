import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const SAMPLE_HISTORY = [
  {
    id: '1',
    type: 'trade',
    symbol: 'EUR/USD',
    action: 'BUY',
    amount: 0.1,
    price: 1.09250,
    profit: 10.00,
    date: new Date('2024-03-05T14:30:00')
  },
  {
    id: '2',
    type: 'deposit',
    method: 'Bitcoin',
    amount: 1000,
    status: 'completed',
    date: new Date('2024-03-04T10:15:00')
  }
];

const HistoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading History</h1>
          <p className="mt-1 text-sm text-gray-500">
            View your trading and transaction history
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status/P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {SAMPLE_HISTORY.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'trade' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.type === 'trade' ? (
                      <>
                        {item.action} {item.symbol} {item.amount} @ {item.price}
                      </>
                    ) : (
                      <>
                        {item.method} deposit
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.type === 'trade' ? item.amount * item.price : item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.type === 'trade' ? (
                      <span className={item.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${item.profit}
                      </span>
                    ) : (
                      <span className="text-green-600">
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
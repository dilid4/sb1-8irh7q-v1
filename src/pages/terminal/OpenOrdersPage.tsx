import React from 'react';
import { Filter } from 'lucide-react';

const OpenOrdersPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Open Orders</h2>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/L</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T/P</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample order data */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">EUR/USD</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Buy Limit
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.0550</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.0500</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.0600</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-05 14:30</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenOrdersPage;
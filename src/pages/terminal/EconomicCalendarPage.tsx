import React from 'react';
import { Calendar, Filter, Search } from 'lucide-react';

const EconomicCalendarPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Economic Calendar</h2>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample event data */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14:30</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">USD</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CPI m/m</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  High
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">0.4%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.3%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.3%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EconomicCalendarPage;
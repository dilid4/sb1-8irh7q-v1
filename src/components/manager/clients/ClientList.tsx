import React from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { Client } from '../../../lib/types/moneyManager';

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance/Equity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open Positions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P/L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${client.balance.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${client.equity.toLocaleString()} equity
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {client.openPositions}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {client.totalPnL >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      client.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${Math.abs(client.totalPnL).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastActivity.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
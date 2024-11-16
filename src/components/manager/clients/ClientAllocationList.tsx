import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { ClientAllocation } from '../../../lib/types/moneyManager';

interface ClientAllocationListProps {
  allocations: ClientAllocation[];
  onModify: (allocationId: string) => void;
}

const ClientAllocationList: React.FC<ClientAllocationListProps> = ({
  allocations,
  onModify
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Client Allocations</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allocation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P/L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Client #{allocation.clientId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    {allocation.allocationAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${allocation.currentValue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {allocation.pnl >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      allocation.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${Math.abs(allocation.pnl).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${allocation.commissionPaid.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allocation.startDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onModify(allocation.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Modify
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

export default ClientAllocationList;
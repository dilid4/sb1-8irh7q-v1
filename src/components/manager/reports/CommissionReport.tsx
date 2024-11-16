import React from 'react';
import { DollarSign } from 'lucide-react';
import { CommissionRecord } from '../../../lib/types/moneyManager';

interface CommissionReportProps {
  commissions: CommissionRecord[];
  onMarkPaid: (commissionId: string) => void;
}

const CommissionReport: React.FC<CommissionReportProps> = ({
  commissions,
  onMarkPaid
}) => {
  const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingCommission = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Commission Report</h3>
          <div className="text-sm text-gray-500">
            Total: ${totalCommission.toLocaleString()}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Monthly</p>
                <p className="mt-1 text-2xl font-semibold text-green-900">
                  ${commissions
                    .filter(c => c.type === 'monthly')
                    .reduce((sum, c) => sum + c.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Performance</p>
                <p className="mt-1 text-2xl font-semibold text-blue-900">
                  ${commissions
                    .filter(c => c.type === 'performance')
                    .reduce((sum, c) => sum + c.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Pending Commissions</h4>
          <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="relative px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {commissions
                  .filter(c => c.status === 'pending')
                  .map((commission) => (
                    <tr key={commission.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Client #{commission.clientId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {commission.type.charAt(0).toUpperCase() + commission.type.slice(1)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${commission.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {commission.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onMarkPaid(commission.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark as Paid
                        </button>
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

export default CommissionReport;
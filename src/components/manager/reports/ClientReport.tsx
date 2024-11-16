import React from 'react';
import { Download } from 'lucide-react';
import { ClientAllocation } from '../../../lib/types/moneyManager';
import ClientPerformanceChart from '../clients/ClientPerformanceChart';

interface ClientReportProps {
  allocation: ClientAllocation;
  monthlyReturns: Record<string, number>;
  onDownload: () => void;
}

const ClientReport: React.FC<ClientReportProps> = ({
  allocation,
  monthlyReturns,
  onDownload
}) => {
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Client Performance Report
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Account overview and performance metrics
            </p>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">Initial Allocation</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              ${allocation.allocationAmount.toLocaleString()}
            </dd>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">Current Value</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              ${allocation.currentValue.toLocaleString()}
            </dd>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">Total Return</dt>
            <dd className={`mt-1 text-2xl font-semibold ${
              allocation.pnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {((allocation.pnl / allocation.allocationAmount) * 100).toFixed(2)}%
            </dd>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <ClientPerformanceChart monthlyReturns={monthlyReturns} />

      {/* Commission Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-sm font-medium text-gray-900">Commission Details</h4>
        <div className="mt-4">
          <div className="border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 flex justify-between">
                <dt className="text-sm text-gray-500">Management Fee</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${((allocation.currentValue * 0.02) / 12).toFixed(2)}/month
                </dd>
              </div>
              <div className="py-4 flex justify-between">
                <dt className="text-sm text-gray-500">Performance Fee</dt>
                <dd className="text-sm font-medium text-gray-900">
                  20% of profits
                </dd>
              </div>
              <div className="py-4 flex justify-between">
                <dt className="text-sm text-gray-500">Total Paid to Date</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${allocation.commissionPaid.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReport;
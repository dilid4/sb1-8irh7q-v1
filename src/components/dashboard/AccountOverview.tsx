import React from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { AccountSummary } from '../../lib/types/user';

interface AccountOverviewProps {
  summary: AccountSummary;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Balance</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              ${summary.balance.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-blue-500" />
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-500">Bonus:</span>
          <span className="ml-1 font-medium text-gray-900">
            ${summary.bonus.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Equity</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              ${summary.equity.toLocaleString()}
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-500">P/L:</span>
          <span className={`ml-1 font-medium ${
            summary.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${Math.abs(summary.profitLoss).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Margin</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              ${summary.margin.toLocaleString()}
            </p>
          </div>
          <AlertCircle className="h-8 w-8 text-orange-500" />
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-500">Free:</span>
          <span className="ml-1 font-medium text-gray-900">
            ${summary.freeMargin.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Margin Level</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {summary.marginLevel.toFixed(2)}%
            </p>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            summary.marginLevel > 200 ? 'bg-green-100' : 
            summary.marginLevel > 100 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <span className={`text-sm font-medium ${
              summary.marginLevel > 200 ? 'text-green-600' : 
              summary.marginLevel > 100 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {summary.marginLevel > 200 ? 'Safe' : 
               summary.marginLevel > 100 ? 'Warning' : 'Danger'}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-500">Status:</span>
          <span className={`ml-1 font-medium ${
            summary.marginLevel > 100 ? 'text-green-600' : 'text-red-600'
          }`}>
            {summary.marginLevel > 100 ? 'Healthy' : 'At Risk'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
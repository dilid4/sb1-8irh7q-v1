import React from 'react';
import { MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { BonusRule } from '../../../lib/types/bonus';

interface BonusRulesListProps {
  rules: BonusRule[];
}

const BonusRulesList: React.FC<BonusRulesListProps> = ({ rules }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Deposit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trading Req.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                  <div className="text-sm text-gray-500">{rule.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {rule.type === 'fixed' ? (
                      `$${rule.amount}`
                    ) : (
                      `${rule.amount}%`
                    )}
                  </div>
                  {rule.maxBonus && (
                    <div className="text-xs text-gray-500">
                      Max: ${rule.maxBonus}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${rule.minDeposit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${rule.tradingRequirement.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rule.expiryDays} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rule.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rule.isActive ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1" />
                    )}
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </span>
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

export default BonusRulesList;
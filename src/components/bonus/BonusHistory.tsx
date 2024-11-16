import React from 'react';
import { UserBonus } from '../../lib/types/bonus';

interface BonusHistoryProps {
  bonuses: UserBonus[];
}

const BonusHistory: React.FC<BonusHistoryProps> = ({ bonuses }) => {
  const completedBonuses = bonuses.filter(
    bonus => ['completed', 'expired', 'cancelled'].includes(bonus.status)
  );

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Bonus History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trading Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {completedBonuses.map((bonus) => (
              <tr key={bonus.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    ${bonus.amount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${bonus.tradingVolume.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    of ${bonus.requiredVolume.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bonus.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : bonus.status === 'expired'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {bonus.status.charAt(0).toUpperCase() + bonus.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(bonus.expiryDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BonusHistory;
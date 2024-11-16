import React from 'react';
import { Gift, Users, TrendingUp, DollarSign } from 'lucide-react';

interface BonusStats {
  totalBonuses: number;
  activeUsers: number;
  completionRate: number;
  totalAmount: number;
}

interface BonusStatisticsProps {
  stats: BonusStats;
}

const BonusStatistics: React.FC<BonusStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Gift className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Bonuses
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.totalBonuses}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Users
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.activeUsers}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completion Rate
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.completionRate}%
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Amount
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  ${stats.totalAmount.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusStatistics;
import React from 'react';
import { Users, TrendingUp, Clock } from 'lucide-react';
import { LandingPage } from '../../lib/types/marketing';

interface LandingPageStatsProps {
  page: LandingPage;
}

const LandingPageStats: React.FC<LandingPageStatsProps> = ({ page }) => {
  const conversionRate = ((page.registrations / page.visits) * 100).toFixed(1);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Landing Page Performance</h3>
        
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="flex items-center text-sm font-medium text-gray-500 truncate">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              Total Visits
            </dt>
            <dd className="mt-1">
              <div className="text-2xl font-semibold text-gray-900">
                {page.visits.toLocaleString()}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Last 30 days
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="flex items-center text-sm font-medium text-gray-500 truncate">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              Registrations
            </dt>
            <dd className="mt-1">
              <div className="text-2xl font-semibold text-gray-900">
                {page.registrations.toLocaleString()}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className={page.registrations > 0 ? 'text-green-500' : 'text-gray-500'}>
                  {page.registrations > 0 ? '+' : ''}{page.registrations} new users
                </span>
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="flex items-center text-sm font-medium text-gray-500 truncate">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              Conversion Rate
            </dt>
            <dd className="mt-1">
              <div className="text-2xl font-semibold text-gray-900">
                {conversionRate}%
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className={`${
                  parseFloat(conversionRate) > 5 ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {parseFloat(conversionRate) > 5 ? 'Good' : 'Needs improvement'}
                </span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default LandingPageStats;
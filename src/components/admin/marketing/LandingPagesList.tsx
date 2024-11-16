import React from 'react';
import { MoreVertical, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { LandingPage } from '../../../lib/types/marketing';

interface LandingPagesListProps {
  pages: LandingPage[];
}

const LandingPagesList: React.FC<LandingPagesListProps> = ({ pages }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {page.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {page.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <a href={`/register/${page.slug}`} target="_blank" rel="noopener noreferrer">
                      {page.slug}
                    </a>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${page.bonusAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.isActive ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1" />
                    )}
                    {page.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {page.registrations} registrations
                  </div>
                  <div className="text-sm text-gray-500">
                    {page.visits} visits ({((page.registrations / page.visits) * 100).toFixed(1)}% conversion)
                  </div>
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

export default LandingPagesList;
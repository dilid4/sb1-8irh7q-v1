import React from 'react';
import { Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '1,234', change: '+12%', icon: Users },
  { name: 'Total Deposits', value: '$123,456', change: '+8%', icon: DollarSign },
  { name: 'Trading Volume', value: '$1.2M', change: '+15%', icon: TrendingUp },
  { name: 'Active Positions', value: '456', change: '+5%', icon: AlertCircle },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your trading platform's performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-5">
              <div className="flow-root">
                <ul className="-mb-8">
                  {[1, 2, 3].map((item, itemIdx) => (
                    <li key={item}>
                      <div className="relative pb-8">
                        {itemIdx !== 2 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                              <Users className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                New user registration <span className="font-medium text-gray-900">John Doe</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              2 hours ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              System Status
            </h3>
            <div className="mt-5">
              <dl className="space-y-5">
                {[
                  { name: 'Trading Engine', status: 'Operational' },
                  { name: 'Payment System', status: 'Operational' },
                  { name: 'Market Data Feed', status: 'Operational' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd className="text-sm text-green-500">{item.status}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
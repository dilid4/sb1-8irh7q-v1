import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, TrendingUp, Wallet, History, ArrowRight } from 'lucide-react';
import AccountOverview from '../../components/dashboard/AccountOverview';
import RecentTrades from '../../components/dashboard/RecentTrades';
import MarketOverview from '../../components/dashboard/MarketOverview';
import ActivePositions from '../../components/dashboard/ActivePositions';
import { AccountSummary } from '../../lib/types/user';

const SAMPLE_ACCOUNT_SUMMARY: AccountSummary = {
  balance: 10000.00,
  equity: 10250.75,
  margin: 1000.00,
  freeMargin: 9250.75,
  marginLevel: 225.50,
  bonus: 100.00,
  profitLoss: 250.75
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your trading account and market activity
            </p>
          </div>
          <Link
            to="/terminal"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <LineChart className="h-4 w-4 mr-2" />
            Open Trading Terminal
          </Link>
        </div>
      </div>

      {/* Account Overview */}
      <AccountOverview summary={SAMPLE_ACCOUNT_SUMMARY} />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Positions</p>
              <h3 className="text-xl font-bold text-gray-900">5</h3>
            </div>
          </div>
          <Link
            to="/positions"
            className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            View all positions
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available Funds</p>
              <h3 className="text-xl font-bold text-gray-900">
                ${SAMPLE_ACCOUNT_SUMMARY.freeMargin.toLocaleString()}
              </h3>
            </div>
          </div>
          <Link
            to="/wallet"
            className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            Manage funds
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <History className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Trades</p>
              <h3 className="text-xl font-bold text-gray-900">12</h3>
            </div>
          </div>
          <Link
            to="/history"
            className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            View history
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Overview */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Market Overview</h2>
          </div>
          <div className="p-6">
            <MarketOverview />
          </div>
        </div>

        {/* Active Positions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Active Positions</h2>
          </div>
          <div className="p-6">
            <ActivePositions />
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Trades</h2>
          </div>
          <div className="p-6">
            <RecentTrades />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
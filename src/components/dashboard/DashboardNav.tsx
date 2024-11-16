import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  History,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Trading', href: '/dashboard/trading', icon: LineChart },
  { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Support', href: '/dashboard/support', icon: HelpCircle },
];

const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <Icon
              className={`mr-3 h-5 w-5 ${
                isActive ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  LineChart,
  Settings,
  Shield,
  Gift,
  Globe,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Deposits', href: '/admin/deposits', icon: DollarSign },
  { name: 'Trading', href: '/admin/trading', icon: LineChart },
  { name: 'Money Managers', href: '/admin/managers', icon: Shield },
  { name: 'Bonus System', href: '/admin/bonus', icon: Gift },
  { name: 'Languages', href: '/admin/languages', icon: Globe },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
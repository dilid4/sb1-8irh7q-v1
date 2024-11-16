import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  LineChart,
  FileText,
  Settings,
  History,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/manager', icon: LayoutDashboard },
  { name: 'Clients', href: '/manager/clients', icon: Users },
  { name: 'Positions', href: '/manager/positions', icon: LineChart },
  { name: 'Reports', href: '/manager/reports', icon: FileText },
  { name: 'History', href: '/manager/history', icon: History },
  { name: 'Settings', href: '/manager/settings', icon: Settings },
];

const ManagerSidebar = () => {
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
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
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

export default ManagerSidebar;
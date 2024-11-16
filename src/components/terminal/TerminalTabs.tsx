import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Briefcase, BarChart2, Calendar, Newspaper } from 'lucide-react';

const tabs = [
  { icon: LineChart, label: 'Charts', path: '/terminal/charts' },
  { icon: Briefcase, label: 'Positions', path: '/terminal/positions' },
  { icon: BarChart2, label: 'Indicators', path: '/terminal/indicators' },
  { icon: Calendar, label: 'Economic Calendar', path: '/terminal/calendar' },
  { icon: Newspaper, label: 'News Feed', path: '/terminal/news' }
];

const TerminalTabs = () => {
  const location = useLocation();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="grid grid-cols-5 gap-1 p-2">
        {tabs.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs ${
              location.pathname === path 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5 mb-1" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TerminalTabs;
import React from 'react';
import { Bell, Settings } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="ml-3 p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
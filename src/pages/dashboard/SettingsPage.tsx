import React from 'react';
import { Shield, Bell, Globe, Lock } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Profile Settings */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                defaultValue="Demo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                defaultValue="User"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                defaultValue="demo@demo.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Security</h2>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Change password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          </div>
          <div className="mt-6 space-y-4">
            {['Price alerts', 'Position updates', 'Account activity', 'Marketing emails'].map((item) => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={item !== 'Marketing emails'}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time zone
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>UTC</option>
                <option>Eastern Time</option>
                <option>Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
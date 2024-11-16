import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Globe2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TradePro</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Markets
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <Link to="/platforms" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Trading Platforms
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Why TradePro
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Open Account
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50"
            >
              Markets
            </Link>
            <Link
              to="/platforms"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Trading Platforms
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Why TradePro
            </Link>
            <Link
              to="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50"
            >
              Open Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
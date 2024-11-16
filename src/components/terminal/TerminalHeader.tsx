import React from 'react';
import { Search, User } from 'lucide-react';

interface TerminalHeaderProps {
  balance: number;
  equity: number;
  margin: number;
  marginLevel: number;
  accountType: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  balance = 0,
  equity = 0,
  margin = 0,
  marginLevel = 0,
  accountType = 'standard'
}) => {
  // Format numbers safely with fallback to 0
  const formatNumber = (num: number) => (num || 0).toLocaleString();

  return (
    <div className="h-14 bg-gray-50 border-b border-gray-200 flex items-center px-4">
      {/* Logo */}
      <div className="flex items-center mr-8">
        <img src="/logo.svg" alt="TradePro" className="h-8" />
      </div>

      {/* Search */}
      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 pl-9 pr-4 rounded-md border border-gray-300 bg-white"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {/* Account Info */}
      <div className="ml-auto flex items-center space-x-8">
        {/* Balance */}
        <div>
          <div className="text-xs text-gray-500">Balance</div>
          <div className="text-sm font-medium">
            GBP {formatNumber(balance)}
          </div>
        </div>

        {/* Margin */}
        <div>
          <div className="text-xs text-gray-500">Margin</div>
          <div className="text-sm font-medium">
            {formatNumber(margin)}
          </div>
        </div>

        {/* Margin Level */}
        <div>
          <div className="text-xs text-gray-500">Level</div>
          <div className="text-sm font-medium">
            {formatNumber(marginLevel)}%
          </div>
        </div>

        {/* Account Type */}
        <div className="flex items-center space-x-2 border-l border-gray-200 pl-8">
          <div>
            <div className="text-xs text-gray-500">Account</div>
            <div className="text-sm font-medium capitalize">{accountType}</div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
import React, { useState } from 'react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Bank, Bitcoin } from 'lucide-react';
import DepositForm from '../../components/wallet/DepositForm';
import WithdrawalForm from '../../components/wallet/WithdrawalForm';
import TransactionHistory from '../../components/wallet/TransactionHistory';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your deposits and withdrawals
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">$10,000.00</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'deposit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowDownCircle className="h-5 w-5 mr-2" />
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'withdraw'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowUpCircle className="h-5 w-5 mr-2" />
              Withdraw
            </button>
          </div>
        </div>

        {activeTab === 'deposit' ? (
          <DepositForm />
        ) : (
          <WithdrawalForm />
        )}
      </div>

      <TransactionHistory />
    </div>
  );
};

export default WalletPage;
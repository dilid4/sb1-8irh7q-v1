import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { Deposit, Withdrawal } from '../../lib/types/payment';

interface Transaction extends Partial<Deposit>, Partial<Withdrawal> {
  type: 'deposit' | 'withdrawal';
}

// Sample data - replace with actual API calls
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    type: 'deposit',
    id: '1',
    amount: 1000,
    currency: 'USD',
    status: 'confirmed',
    btcAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    createdAt: new Date('2024-03-01'),
    confirmedAt: new Date('2024-03-01')
  },
  {
    type: 'withdrawal',
    id: '2',
    amount: 500,
    currency: 'USD',
    status: 'completed',
    method: 'btc',
    destination: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    createdAt: new Date('2024-03-02'),
    processedAt: new Date('2024-03-02')
  }
];

const TransactionHistory = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {SAMPLE_TRANSACTIONS.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {transaction.type === 'deposit' ? (
                      <ArrowDownCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <ArrowUpCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${transaction.amount?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.currency}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'confirmed' || transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.type === 'deposit'
                    ? `BTC Address: ${transaction.btcAddress}`
                    : `Method: ${transaction.method}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.createdAt?.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
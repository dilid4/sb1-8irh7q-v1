import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import BonusRulesList from '../../components/admin/bonus/BonusRulesList';
import CreateBonusModal from '../../components/admin/bonus/CreateBonusModal';
import { BonusRule } from '../../lib/types/bonus';

// Sample data - replace with API call
const SAMPLE_BONUS_RULES: BonusRule[] = [
  {
    id: '1',
    name: 'Welcome Bonus',
    description: 'New user registration bonus',
    amount: 100,
    type: 'fixed',
    minDeposit: 100,
    maxBonus: 100,
    expiryDays: 30,
    tradingRequirement: 10000,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Deposit Bonus',
    description: '50% bonus on deposits',
    amount: 50,
    type: 'percentage',
    minDeposit: 500,
    maxBonus: 1000,
    expiryDays: 60,
    tradingRequirement: 50000,
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

const BonusPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateBonus = (rule: Omit<BonusRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Creating bonus rule:', rule);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bonus System</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage trading bonuses and promotional offers
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Bonus
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search bonus rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <BonusRulesList rules={SAMPLE_BONUS_RULES} />

      {showCreateModal && (
        <CreateBonusModal
          onSubmit={handleCreateBonus}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

export default BonusPage;
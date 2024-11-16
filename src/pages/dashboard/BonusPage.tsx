import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';
import ActiveBonuses from '../../components/bonus/ActiveBonuses';
import BonusHistory from '../../components/bonus/BonusHistory';
import { UserBonus } from '../../lib/types/bonus';
import { bonusService } from '../../lib/services/bonusService';

const BonusPage = () => {
  const [bonuses, setBonuses] = useState<UserBonus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const userBonuses = await bonusService.getUserBonuses('user123'); // Replace with actual user ID
        setBonuses(userBonuses);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBonuses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trading Bonuses</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your active bonuses and trading requirements
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Gift className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Welcome Bonus Available
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Make your first deposit to receive a $100 trading bonus. Complete the trading
              requirements to withdraw your bonus and profits.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Active Bonuses</h2>
          <ActiveBonuses bonuses={bonuses} />
        </div>

        <BonusHistory bonuses={bonuses} />
      </div>
    </div>
  );
};

export default BonusPage;
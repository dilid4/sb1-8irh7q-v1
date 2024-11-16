import React from 'react';
import { Gift } from 'lucide-react';
import { UserBonus } from '../../lib/types/bonus';
import BonusProgress from './BonusProgress';

interface ActiveBonusesProps {
  bonuses: UserBonus[];
}

const ActiveBonuses: React.FC<ActiveBonusesProps> = ({ bonuses }) => {
  const activeBonuses = bonuses.filter(bonus => bonus.status === 'active');

  if (activeBonuses.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Gift className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Bonuses</h3>
        <p className="mt-1 text-sm text-gray-500">
          Make a deposit to qualify for trading bonuses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeBonuses.map((bonus) => (
        <BonusProgress key={bonus.id} bonus={bonus} />
      ))}
    </div>
  );
};

export default ActiveBonuses;
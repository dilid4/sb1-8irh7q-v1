import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserBonus } from '../../lib/types/bonus';

interface BonusProgressProps {
  bonus: UserBonus;
}

const BonusProgress: React.FC<BonusProgressProps> = ({ bonus }) => {
  const progress = (bonus.tradingVolume / bonus.requiredVolume) * 100;
  const remaining = bonus.requiredVolume - bonus.tradingVolume;
  const daysRemaining = Math.ceil((new Date(bonus.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={buildStyles({
              pathColor: progress >= 100 ? '#10B981' : '#3B82F6',
              textColor: '#1F2937',
              trailColor: '#E5E7EB'
            })}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{bonus.amount} USD Bonus</h3>
          <p className="mt-1 text-sm text-gray-500">
            Trading requirement: ${bonus.requiredVolume.toLocaleString()}
          </p>
          
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Completed volume:</span>
              <span className="font-medium">${bonus.tradingVolume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Remaining volume:</span>
              <span className="font-medium">${remaining.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time remaining:</span>
              <span className={`font-medium ${daysRemaining <= 3 ? 'text-red-600' : 'text-gray-900'}`}>
                {daysRemaining} days
              </span>
            </div>
          </div>

          {bonus.status === 'completed' && (
            <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completed
            </div>
          )}
          
          {bonus.status === 'expired' && (
            <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Expired
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusProgress;
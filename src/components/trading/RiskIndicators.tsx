import React from 'react';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { MarginRequirements } from '../../lib/types/margin';
import MarginWarning from './MarginWarning';

interface RiskIndicatorsProps {
  marginRequirements: MarginRequirements;
  equity: number;
  balance: number;
}

const RiskIndicators: React.FC<RiskIndicatorsProps> = ({
  marginRequirements,
  equity,
  balance
}) => {
  const marginLevel = marginRequirements.level;
  const freeMargin = marginRequirements.free;
  const usedMargin = marginRequirements.used;

  return (
    <div className="space-y-4">
      <MarginWarning marginRequirements={marginRequirements} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Margin Level</p>
              <p className={`text-lg font-semibold ${
                marginLevel > 200 ? 'text-green-600' :
                marginLevel > 100 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {marginLevel.toFixed(2)}%
              </p>
            </div>
            <Shield className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Free Margin</p>
              <p className="text-lg font-semibold text-gray-900">
                ${freeMargin.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Used Margin</p>
              <p className="text-lg font-semibold text-gray-900">
                ${usedMargin.toFixed(2)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Equity</span>
            <span className="font-medium">${equity.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Balance</span>
            <span className="font-medium">${balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Floating P/L</span>
            <span className={`font-medium ${
              equity - balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${(equity - balance).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskIndicators;
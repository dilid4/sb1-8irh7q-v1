import React from 'react';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import { useMarginMonitor } from '../../hooks/useMarginMonitor';

interface MarginIndicatorProps {
  balance: number;
}

const MarginIndicator: React.FC<MarginIndicatorProps> = ({ balance }) => {
  const { marginRequirements, isMarginCall, isStopOut, hasWarning } = useMarginMonitor(balance);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Margin Level</h3>
          <span className={`text-lg font-semibold ${
            isStopOut ? 'text-red-600' :
            isMarginCall ? 'text-orange-600' :
            hasWarning ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {marginRequirements.level.toFixed(2)}%
          </span>
        </div>

        {(isStopOut || isMarginCall || hasWarning) && (
          <div className={`p-3 rounded-md ${
            isStopOut ? 'bg-red-50 border border-red-200' :
            isMarginCall ? 'bg-orange-50 border border-orange-200' :
            'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-center">
              {isStopOut ? (
                <AlertOctagon className="h-5 w-5 text-red-500 mr-2" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              )}
              <span className={`text-sm ${
                isStopOut ? 'text-red-700' :
                isMarginCall ? 'text-orange-700' :
                'text-yellow-700'
              }`}>
                {isStopOut ? 'Stop-out level reached' :
                 isMarginCall ? 'Margin call - close positions or deposit funds' :
                 'Low margin warning'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Used Margin</p>
            <p className="font-medium">${marginRequirements.used.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Free Margin</p>
            <p className="font-medium">${marginRequirements.free.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginIndicator;
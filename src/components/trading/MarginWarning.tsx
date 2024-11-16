import React from 'react';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import { MarginRequirements } from '../../lib/types/margin';
import { riskManagementService } from '../../lib/services/riskManagementService';

interface MarginWarningProps {
  marginRequirements: MarginRequirements;
}

const MarginWarning: React.FC<MarginWarningProps> = ({ marginRequirements }) => {
  const levels = riskManagementService.getMarginLevels();

  if (marginRequirements.level <= levels.stopOut) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex items-center">
          <AlertOctagon className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-red-800">
              Stop-Out Warning
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Your margin level has reached the stop-out level. Positions will be automatically closed to protect your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (marginRequirements.level <= levels.marginCall) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-orange-800">
              Margin Call Warning
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              Your margin level is critically low. Please close some positions or deposit additional funds to avoid stop-out.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (marginRequirements.level <= levels.warning) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Low Margin Warning
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your margin level is getting low. Consider reducing your exposure or adding funds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default MarginWarning;
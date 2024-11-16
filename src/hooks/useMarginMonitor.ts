import { useState, useEffect, useCallback } from 'react';
import { MarginRequirements } from '../lib/types/margin';
import { marginService } from '../lib/services/marginService';
import { riskManagementService } from '../lib/services/riskManagementService';
import { usePositionStore } from '../lib/store/positionStore';

const DEFAULT_MARGIN_REQUIREMENTS: MarginRequirements = {
  required: 0,
  used: 0,
  free: 0,
  level: 0
};

export function useMarginMonitor(balance: number) {
  const [marginRequirements, setMarginRequirements] = useState<MarginRequirements>(DEFAULT_MARGIN_REQUIREMENTS);
  const positions = usePositionStore((state) => state.getAllPositions());

  const calculateMargin = useCallback(() => {
    const requirements = marginService.calculateAccountMargin(positions, balance);
    setMarginRequirements(requirements);
  }, [positions, balance]);

  useEffect(() => {
    calculateMargin();
    const interval = setInterval(calculateMargin, 1000);
    return () => clearInterval(interval);
  }, [calculateMargin]);

  return {
    marginRequirements,
    isMarginCall: marginService.checkMarginCall(marginRequirements.level),
    isStopOut: marginService.checkStopOut(marginRequirements.level),
    hasWarning: marginService.checkMarginWarning(marginRequirements.level)
  };
}
import { useEffect } from 'react';
import { Position } from '../lib/types/trading';
import { MarginRequirements } from '../lib/types/margin';
import { riskManagementService } from '../lib/services/riskManagementService';
import { marginService } from '../lib/services/marginService';
import { usePositionStore } from '../store/positionStore';

export function useRiskManagement(balance: number) {
  const positions = usePositionStore((state) => state.getAllPositions());

  useEffect(() => {
    const monitorRisk = async () => {
      const marginReqs = marginService.calculateAccountMargin(positions, balance);
      
      // Handle stop-out if necessary
      await riskManagementService.handleStopOut(positions, marginReqs);
    };

    // Monitor risk levels every second
    const interval = setInterval(monitorRisk, 1000);

    return () => clearInterval(interval);
  }, [positions, balance]);

  const validateNewPosition = (
    symbol: string,
    volume: number,
    price: number
  ) => {
    return riskManagementService.validateNewPosition(
      symbol,
      volume,
      price,
      balance,
      positions
    );
  };

  return {
    validateNewPosition,
    positions
  };
}
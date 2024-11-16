import { useEffect } from 'react';
import { tradingService } from '../lib/services/tradingService';
import { riskManagementService } from '../lib/services/riskManagementService';
import { usePositionStore } from '../lib/store/positionStore';

export function usePositionUpdates(balance: number) {
  const positions = usePositionStore((state) => state.getAllPositions());

  useEffect(() => {
    const updatePositions = async () => {
      // Update position prices and P/L
      tradingService.updatePositionPrices();

      // Check stop/limit levels
      tradingService.checkStopLevels();

      // Monitor risk levels
      await riskManagementService.monitorPositions(positions, balance);
    };

    // Update every second
    const interval = setInterval(updatePositions, 1000);

    return () => clearInterval(interval);
  }, [positions, balance]);

  return positions;
}
import { useState } from 'react';
import { Position } from '../lib/types/trading';
import { positionService } from '../lib/services/positionService';

export function usePositionManagement() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyPosition = async (positionId: string, takeProfit?: number, stopLoss?: number) => {
    setIsProcessing(true);
    setError(null);

    try {
      const success = await positionService.modifyPosition(positionId, takeProfit, stopLoss);
      if (!success) {
        setError('Failed to modify position');
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to modify position';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const closePosition = async (positionId: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const success = await positionService.closePosition(positionId);
      if (!success) {
        setError('Failed to close position');
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to close position';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    modifyPosition,
    closePosition,
    isProcessing,
    error
  };
}
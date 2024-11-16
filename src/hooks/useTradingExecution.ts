import { useState } from 'react';
import { OrderRequest, OrderResponse } from '../lib/types/order';
import { tradingService } from '../lib/services/tradingService';
import { useMarginMonitor } from './useMarginMonitor';

export function useTradingExecution(balance: number) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const { marginRequirements } = useMarginMonitor(balance);

  const executeOrder = async (request: OrderRequest): Promise<OrderResponse> => {
    setIsExecuting(true);
    setLastError(null);

    try {
      // Check margin requirements
      if (marginRequirements.level < 100) {
        throw new Error('Insufficient margin to open new position');
      }

      const response = await tradingService.executeOrder(request, balance);
      if (!response.success) {
        setLastError(response.error || 'Order execution failed');
      }
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Order execution failed';
      setLastError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeOrder,
    isExecuting,
    lastError,
    marginRequirements
  };
}
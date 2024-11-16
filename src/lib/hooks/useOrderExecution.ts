import { useState } from 'react';
import { OrderRequest, OrderResponse } from '../types/order';
import { orderService } from '../services/orderService';

export function useOrderExecution(accountBalance: number) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const executeOrder = async (request: OrderRequest): Promise<OrderResponse> => {
    setIsExecuting(true);
    setLastError(null);

    try {
      const response = await orderService.executeOrder(request, accountBalance);
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
  };
}
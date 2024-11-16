import { useEffect, useState } from 'react';
import { tradingEngine } from '../lib/services/tradingEngine';
import { wsService } from '../lib/services/websocketService';
import { OrderRequest, OrderResponse } from '../lib/types/order';
import { MarketWatch } from '../lib/types/trading';
import { useMarketStore } from '../lib/store/marketStore';

export function useTradingEngine(symbols: string[]) {
  const [isConnected, setIsConnected] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    // Connect to WebSocket and subscribe to symbols
    wsService.connect();
    wsService.subscribe(symbols);

    // Subscribe to price updates
    const subscription = tradingEngine.onPriceUpdate((price: MarketWatch) => {
      useMarketStore.getState().updatePrice(
        price.symbol,
        price.bid,
        price.ask
      );
    });

    setIsConnected(true);

    return () => {
      wsService.unsubscribe(symbols);
      subscription.unsubscribe();
    };
  }, [symbols]);

  const executeOrder = async (request: OrderRequest): Promise<OrderResponse> => {
    setIsExecuting(true);
    setLastError(null);

    try {
      const response = await tradingEngine.executeOrder(request, 10000); // Replace with actual balance
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
    isConnected,
    isExecuting,
    lastError,
    executeOrder
  };
}
import { useEffect } from 'react';
import { wsService } from '../lib/services/websocket';

export function useMarketSubscription(symbols: string[]) {
  useEffect(() => {
    wsService.connect();
    wsService.subscribe(symbols);

    return () => {
      wsService.unsubscribe(symbols);
    };
  }, [symbols]);
}
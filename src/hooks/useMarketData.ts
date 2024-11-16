import { useState, useEffect } from 'react';
import { MarketData } from '../lib/types/market';
import { polygonService } from '../lib/services/polygonService';
import { useMarketStore } from '../lib/store/marketStore';

export function useMarketData(symbol: string, type: MarketData['type']) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setMarket = useMarketStore((state) => state.setMarket);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!symbol || !type) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await polygonService.getMarketData(symbol, type);
        if (isMounted) {
          setMarket(symbol, data);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market data';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [symbol, type, setMarket]);

  const market = useMarketStore((state) => state.markets[symbol]);

  return {
    market,
    isLoading,
    error
  };
}
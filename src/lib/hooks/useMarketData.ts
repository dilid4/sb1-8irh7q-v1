import { useState, useEffect } from 'react';
import { MarketData } from '../types/market';
import { marketService } from '../services/marketService';

export function useMarketData(symbol: string) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await marketService.getMarketData(symbol, controller.signal);
        if (isMounted) {
          setMarketData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch market data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Poll for updates every second
    const interval = setInterval(fetchData, 1000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [symbol]);

  return { marketData, isLoading, error };
}
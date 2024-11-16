import { useState, useEffect } from 'react';
import { MarketData } from '../lib/types/market';
import { polygonService } from '../lib/services/polygonService';
import { useMarketStore } from '../lib/store/marketStore';

interface MarketSymbol {
  symbol: string;
  type: MarketData['type'];
}

export function useMarketsData(symbols: MarketSymbol[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setMarket = useMarketStore((state) => state.setMarket);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!symbols.length) return;

      setIsLoading(true);
      setError(null);

      try {
        const promises = symbols.map(({ symbol, type }) =>
          polygonService.getMarketData(symbol, type)
        );

        const results = await Promise.all(promises);
        
        if (isMounted) {
          results.forEach((data) => {
            setMarket(data.symbol, data);
          });
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch markets data';
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
  }, [symbols, setMarket]);

  const markets = useMarketStore((state) => 
    symbols.map(({ symbol }) => state.markets[symbol]).filter(Boolean)
  );

  return {
    markets,
    isLoading,
    error
  };
}
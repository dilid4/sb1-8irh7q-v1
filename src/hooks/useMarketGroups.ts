import { useState, useEffect } from 'react';
import { MarketGroup } from '../lib/types/market';
import { marketService } from '../lib/services/marketService';

export function useMarketGroups() {
  const [groups, setGroups] = useState<MarketGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const data = await marketService.getMarketGroups();
        setGroups(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch market groups');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return { groups, isLoading, error };
}
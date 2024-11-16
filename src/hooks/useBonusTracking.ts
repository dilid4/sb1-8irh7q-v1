import { useEffect } from 'react';
import { bonusService } from '../lib/services/bonusService';
import { Position } from '../lib/types/trading';
import { usePositionStore } from '../lib/store/positionStore';

export function useBonusTracking(userId: string) {
  const positions = usePositionStore((state) => state.getAllPositions());

  useEffect(() => {
    const trackTradingVolume = async (position: Position) => {
      // Calculate volume in USD
      const volume = position.lots * 100000; // Standard lot size
      await bonusService.updateTradingVolume(userId, volume);
    };

    // Track volume for each closed position
    const unsubscribe = usePositionStore.subscribe((state, prevState) => {
      const prevPositions = prevState.positions;
      const currentPositions = state.positions;

      // Find closed positions
      Object.keys(prevPositions).forEach(id => {
        if (!currentPositions[id]) {
          trackTradingVolume(prevPositions[id]);
        }
      });
    });

    return () => unsubscribe();
  }, [userId]);

  // Check bonus expiration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      bonusService.checkBonusExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
}
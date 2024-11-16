import { useState } from 'react';
import { BonusRule } from '../types/bonus';
import { bonusService } from '../lib/services/bonusService';
import { useBonusStore } from '../lib/store/bonusStore';

export function useBonusManagement() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addRule = useBonusStore((state) => state.addRule);
  const updateRule = useBonusStore((state) => state.updateRule);

  const createBonusRule = async (rule: Omit<BonusRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsProcessing(true);
    setError(null);

    try {
      const newRule = await bonusService.createBonusRule(rule);
      addRule(newRule);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create bonus rule';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleBonusRule = async (id: string, isActive: boolean) => {
    setIsProcessing(true);
    setError(null);

    try {
      const success = await bonusService.toggleBonusRule(id, isActive);
      if (success) {
        updateRule(id, { isActive });
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle bonus rule';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    createBonusRule,
    toggleBonusRule,
    isProcessing,
    error
  };
}
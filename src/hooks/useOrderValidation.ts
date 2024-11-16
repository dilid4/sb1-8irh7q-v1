import { useState } from 'react';
import { Position } from '../lib/types/trading';
import { riskManagementService } from '../lib/services/riskManagementService';

export function useOrderValidation(balance: number, positions: Position[]) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateOrder = (order: any) => {
    const validation = riskManagementService.validateOrder(
      order,
      balance,
      positions
    );

    if (!validation.isValid) {
      setValidationError(validation.error || 'Order validation failed');
      return false;
    }

    setValidationError(null);
    return true;
  };

  return {
    validateOrder,
    validationError
  };
}
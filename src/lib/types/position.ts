export interface PositionUpdate {
  takeProfit?: number;
  stopLoss?: number;
}

export interface PositionState {
  positions: Record<string, Position>;
  addPosition: (position: Position) => void;
  updatePosition: (id: string, update: Partial<Position>) => void;
  removePosition: (id: string) => void;
  getPosition: (id: string) => Position | undefined;
  getAllPositions: () => Position[];
}

export interface PositionModification {
  positionId: string;
  takeProfit?: number;
  stopLoss?: number;
}</content></file>
<boltAction type="file" filePath="src/lib/store/positionStore.ts">import { create } from 'zustand';
import { Position } from '../types/trading';
import { PositionState } from '../types/position';

export const usePositionStore = create<PositionState>((set, get) => ({
  positions: {},
  
  addPosition: (position: Position) =>
    set((state) => ({
      positions: { ...state.positions, [position.id]: position }
    })),
  
  updatePosition: (id: string, update: Partial<Position>) =>
    set((state) => {
      const position = state.positions[id];
      if (!position) return state;
      
      return {
        positions: {
          ...state.positions,
          [id]: { ...position, ...update }
        }
      };
    }),
  
  removePosition: (id: string) =>
    set((state) => {
      const { [id]: removed, ...positions } = state.positions;
      return { positions };
    }),
  
  getPosition: (id: string) => get().positions[id],
  
  getAllPositions: () => Object.values(get().positions)
}));</content></file>
<boltAction type="file" filePath="src/lib/services/positionService.ts">import { Position } from '../types/trading';
import { PositionModification } from '../types/position';
import { usePositionStore } from '../store/positionStore';
import { orderService } from './orderService';

class PositionService {
  async modifyPosition(modification: PositionModification): Promise<boolean> {
    try {
      const { positionId, takeProfit, stopLoss } = modification;
      const position = usePositionStore.getState().getPosition(positionId);
      
      if (!position) {
        throw new Error('Position not found');
      }

      // Validate modification
      if (takeProfit) {
        const isValidTP = position.type === 'BUY' 
          ? takeProfit > position.currentPrice
          : takeProfit < position.currentPrice;
          
        if (!isValidTP) {
          throw new Error('Invalid Take Profit level');
        }
      }

      if (stopLoss) {
        const isValidSL = position.type === 'BUY'
          ? stopLoss < position.currentPrice
          : stopLoss > position.currentPrice;
          
        if (!isValidSL) {
          throw new Error('Invalid Stop Loss level');
        }
      }

      // Update position
      usePositionStore.getState().updatePosition(positionId, {
        takeProfit,
        stopLoss
      });

      return true;
    } catch (error) {
      console.error('Failed to modify position:', error);
      return false;
    }
  }

  async closePosition(positionId: string): Promise<boolean> {
    try {
      const position = usePositionStore.getState().getPosition(positionId);
      
      if (!position) {
        throw new Error('Position not found');
      }

      // Calculate final P/L
      const finalPnL = orderService.calculatePnL(position);

      // Remove position
      usePositionStore.getState().removePosition(positionId);

      // Here you would typically make an API call to your backend
      // to record the closed position and update account balance

      return true;
    } catch (error) {
      console.error('Failed to close position:', error);
      return false;
    }
  }

  updatePositionPrices(): void {
    const positions = usePositionStore.getState().getAllPositions();
    
    positions.forEach(position => {
      const pnl = orderService.calculatePnL(position);
      
      usePositionStore.getState().updatePosition(position.id, {
        profitLoss: pnl,
        currentPrice: position.currentPrice // Updated from market data
      });
    });
  }

  checkStopLevels(): void {
    const positions = usePositionStore.getState().getAllPositions();
    
    positions.forEach(position => {
      if (position.stopLoss) {
        const shouldStopOut = position.type === 'BUY'
          ? position.currentPrice <= position.stopLoss
          : position.currentPrice >= position.stopLoss;
          
        if (shouldStopOut) {
          this.closePosition(position.id);
        }
      }

      if (position.takeProfit) {
        const shouldTakeProfit = position.type === 'BUY'
          ? position.currentPrice >= position.takeProfit
          : position.currentPrice <= position.takeProfit;
          
        if (shouldTakeProfit) {
          this.closePosition(position.id);
        }
      }
    });
  }
}

export const positionService = new PositionService();</content></file>
<boltAction type="file" filePath="src/hooks/usePositionManagement.ts">import { useState } from 'react';
import { PositionModification } from '../types/position';
import { positionService } from '../lib/services/positionService';

export function usePositionManagement() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyPosition = async (modification: PositionModification): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    try {
      const success = await positionService.modifyPosition(modification);
      if (!success) {
        setError('Failed to modify position');
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to modify position';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const closePosition = async (positionId: string): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    try {
      const success = await positionService.closePosition(positionId);
      if (!success) {
        setError('Failed to close position');
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to close position';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    modifyPosition,
    closePosition,
    isProcessing,
    error
  };
}</content></file>
<boltAction type="file" filePath="src/components/terminal/ModifyPositionModal.tsx">import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Position } from '../../lib/types/trading';
import { PositionModification } from '../../lib/types/position';

interface ModifyPositionModalProps {
  position: Position;
  onModify: (modification: PositionModification) => Promise<void>;
  onClose: () => void;
  isProcessing: boolean;
  error?: string | null;
}

const ModifyPositionModal: React.FC<ModifyPositionModalProps> = ({
  position,
  onModify,
  onClose,
  isProcessing,
  error
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PositionModification>({
    defaultValues: {
      positionId: position.id,
      takeProfit: position.takeProfit,
      stopLoss: position.stopLoss
    }
  });

  const onSubmit = async (data: PositionModification) => {
    await onModify(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Modify Position - {position.symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Take Profit
            </label>
            <input
              type="number"
              step="0.00001"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('takeProfit')}
            />
            {errors.takeProfit && (
              <p className="mt-1 text-sm text-red-600">{errors.takeProfit.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stop Loss
            </label>
            <input
              type="number"
              step="0.00001"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('stopLoss')}
            />
            {errors.stopLoss && (
              <p className="mt-1 text-sm text-red-600">{errors.stopLoss.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyPositionModal;</content></file>
<boltAction type="start">
<command>npm run dev</command>
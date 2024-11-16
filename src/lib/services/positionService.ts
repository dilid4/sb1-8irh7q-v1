import { Position } from '../types/trading';
import { usePositionStore } from '../store/positionStore';
import { orderService } from './orderService';

class PositionService {
  async modifyPosition(positionId: string, takeProfit?: number, stopLoss?: number): Promise<boolean> {
    try {
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

export const positionService = new PositionService();
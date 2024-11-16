import { Position } from '../types/trading';
import { OrderRequest, OrderResponse } from '../types/order';
import { marginService } from './marginService';
import { riskManagementService } from './riskManagementService';
import { useMarketStore } from '../store/marketStore';
import { usePositionStore } from '../store/positionStore';

class TradingService {
  async executeOrder(request: OrderRequest, balance: number): Promise<OrderResponse> {
    try {
      // Get current market data
      const market = useMarketStore.getState().markets[request.symbol];
      if (!market) {
        return {
          success: false,
          error: 'Market not available'
        };
      }

      // Get current positions
      const positions = usePositionStore.getState().getAllPositions();

      // Validate order
      const validation = riskManagementService.validateOrder(request, balance, positions);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error
        };
      }

      // Calculate execution price
      const executionPrice = request.type === 'BUY' ? market.ask : market.bid;

      // Calculate margin requirements
      const marginCalc = marginService.calculatePositionMargin(
        request.symbol,
        request.volume,
        executionPrice
      );

      if (marginCalc.hasError) {
        return {
          success: false,
          error: marginCalc.error
        };
      }

      // Create position
      const position: Position = {
        id: Math.random().toString(36).substring(7),
        symbol: request.symbol,
        type: request.type,
        openPrice: executionPrice,
        currentPrice: executionPrice,
        lots: request.volume,
        takeProfit: request.takeProfit,
        stopLoss: request.stopLoss,
        swap: 0,
        commission: -(request.volume * 10), // $10 per lot
        profitLoss: 0,
        openTime: new Date()
      };

      // Add position to store
      usePositionStore.getState().addPosition(position);

      return {
        success: true,
        orderId: position.id,
        position: {
          id: position.id,
          openPrice: position.openPrice,
          volume: position.lots
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Order execution failed'
      };
    }
  }

  async modifyPosition(
    positionId: string,
    takeProfit?: number,
    stopLoss?: number
  ): Promise<boolean> {
    try {
      const position = usePositionStore.getState().getPosition(positionId);
      if (!position) {
        throw new Error('Position not found');
      }

      // Validate take profit and stop loss levels
      const market = useMarketStore.getState().markets[position.symbol];
      if (!market) {
        throw new Error('Market data not available');
      }

      if (takeProfit) {
        const isValidTP = position.type === 'BUY' 
          ? takeProfit > market.ask
          : takeProfit < market.bid;
          
        if (!isValidTP) {
          throw new Error('Invalid take profit level');
        }
      }

      if (stopLoss) {
        const isValidSL = position.type === 'BUY'
          ? stopLoss < market.ask
          : stopLoss > market.bid;
          
        if (!isValidSL) {
          throw new Error('Invalid stop loss level');
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

      const market = useMarketStore.getState().markets[position.symbol];
      if (!market) {
        throw new Error('Market data not available');
      }

      // Calculate final P/L
      const closePrice = position.type === 'BUY' ? market.bid : market.ask;
      const priceDiff = position.type === 'BUY'
        ? closePrice - position.openPrice
        : position.openPrice - closePrice;

      const profitLoss = (priceDiff * position.lots * 100000) + 
        position.swap + position.commission;

      // Remove position from store
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
    const markets = useMarketStore.getState().markets;
    
    positions.forEach(position => {
      const market = markets[position.symbol];
      if (!market) return;

      const currentPrice = position.type === 'BUY' ? market.bid : market.ask;
      const priceDiff = position.type === 'BUY'
        ? currentPrice - position.openPrice
        : position.openPrice - currentPrice;

      const profitLoss = (priceDiff * position.lots * 100000) +
        position.swap + position.commission;
      
      usePositionStore.getState().updatePosition(position.id, {
        currentPrice,
        profitLoss
      });
    });
  }

  checkStopLevels(): void {
    const positions = usePositionStore.getState().getAllPositions();
    const markets = useMarketStore.getState().markets;
    
    positions.forEach(position => {
      const market = markets[position.symbol];
      if (!market) return;

      const currentPrice = position.type === 'BUY' ? market.bid : market.ask;

      if (position.stopLoss) {
        const shouldStopOut = position.type === 'BUY'
          ? currentPrice <= position.stopLoss
          : currentPrice >= position.stopLoss;
          
        if (shouldStopOut) {
          this.closePosition(position.id);
        }
      }

      if (position.takeProfit) {
        const shouldTakeProfit = position.type === 'BUY'
          ? currentPrice >= position.takeProfit
          : currentPrice <= position.takeProfit;
          
        if (shouldTakeProfit) {
          this.closePosition(position.id);
        }
      }
    });
  }
}

export const tradingService = new TradingService();
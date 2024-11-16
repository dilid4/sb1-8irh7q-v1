import { OrderRequest, OrderValidation, OrderResponse } from '../types/order';
import { Position } from '../types/trading';
import { useMarketStore } from '../store/marketStore';

class OrderService {
  private calculateRequiredMargin(price: number, volume: number, leverage: number = 100): number {
    return (price * volume * 100000) / leverage;
  }

  private validateOrder(request: OrderRequest, balance: number): OrderValidation {
    const market = useMarketStore.getState().markets[request.symbol];
    if (!market) {
      return { isValid: false, error: 'Market not found' };
    }

    const price = request.type === 'BUY' ? market.ask : market.bid;
    const requiredMargin = this.calculateRequiredMargin(price, request.volume);

    if (requiredMargin > balance) {
      return {
        isValid: false,
        error: 'Insufficient margin',
        requiredMargin,
        maxVolume: (balance * 100) / (price * 100000)
      };
    }

    if (request.volume < 0.01 || request.volume > 100) {
      return { isValid: false, error: 'Invalid volume' };
    }

    if (request.takeProfit) {
      const invalidTP = request.type === 'BUY' 
        ? request.takeProfit <= price
        : request.takeProfit >= price;
      if (invalidTP) {
        return { isValid: false, error: 'Invalid Take Profit level' };
      }
    }

    if (request.stopLoss) {
      const invalidSL = request.type === 'BUY'
        ? request.stopLoss >= price
        : request.stopLoss <= price;
      if (invalidSL) {
        return { isValid: false, error: 'Invalid Stop Loss level' };
      }
    }

    return { isValid: true, requiredMargin };
  }

  async executeOrder(request: OrderRequest, balance: number): Promise<OrderResponse> {
    const validation = this.validateOrder(request, balance);
    
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    const market = useMarketStore.getState().markets[request.symbol];
    const executionPrice = request.type === 'BUY' ? market.ask : market.bid;

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful order
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
        commission: -2,
        profitLoss: 0,
        openTime: new Date()
      };

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
        error: 'Order execution failed'
      };
    }
  }

  calculatePnL(position: Position): number {
    const market = useMarketStore.getState().markets[position.symbol];
    if (!market) return 0;

    const currentPrice = position.type === 'BUY' ? market.bid : market.ask;
    const priceDiff = position.type === 'BUY'
      ? currentPrice - position.openPrice
      : position.openPrice - currentPrice;

    return (priceDiff * position.lots * 100000) + position.swap + position.commission;
  }
}

export const orderService = new OrderService();
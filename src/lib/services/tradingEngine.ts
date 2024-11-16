import { Subject } from 'rxjs';
import { MarketWatch } from '../types/trading';
import { OrderRequest, OrderResponse } from '../types/order';
import { Position } from '../types/trading';
import { marginService } from './marginService';
import { riskManagementService } from './riskManagementService';
import { useMarketStore } from '../store/marketStore';
import { usePositionStore } from '../store/positionStore';

class TradingEngine {
  private priceUpdates = new Subject<MarketWatch>();
  private orderQueue: OrderRequest[] = [];
  private isProcessing = false;
  private swapRates: Record<string, { long: number; short: number }> = {
    'EUR/USD': { long: -2.5, short: -1.8 },
    'GBP/USD': { long: -3.2, short: -2.1 },
    'BTC/USD': { long: -5.0, short: -5.0 }
  };

  // Subscribe to price updates
  onPriceUpdate(callback: (price: MarketWatch) => void) {
    return this.priceUpdates.subscribe(callback);
  }

  // Update market prices
  updatePrice(symbol: string, bid: number, ask: number) {
    const market = useMarketStore.getState().markets[symbol];
    if (!market) return;

    const update: MarketWatch = {
      symbol,
      bid,
      ask,
      spread: Number((ask - bid).toFixed(5)),
      change: bid - market.bid,
      changePercent: ((bid - market.bid) / market.bid) * 100,
      high: Math.max(market.high, bid),
      low: Math.min(market.low, bid),
      time: new Date()
    };

    useMarketStore.getState().setMarket(symbol, update);
    this.priceUpdates.next(update);
    this.checkPositions();
  }

  // Process order execution
  async executeOrder(request: OrderRequest, balance: number): Promise<OrderResponse> {
    try {
      // Add order to queue
      this.orderQueue.push(request);
      
      // Process queue if not already processing
      if (!this.isProcessing) {
        await this.processOrderQueue(balance);
      }

      // Wait for order to be processed
      const position = await this.waitForOrderExecution(request);
      
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

  private async processOrderQueue(balance: number) {
    this.isProcessing = true;

    while (this.orderQueue.length > 0) {
      const order = this.orderQueue[0];
      
      try {
        // Get current market data
        const market = useMarketStore.getState().markets[order.symbol];
        if (!market) {
          throw new Error('Market not available');
        }

        // Validate order
        const validation = await riskManagementService.validateOrder(
          order,
          balance,
          usePositionStore.getState().getAllPositions()
        );

        if (!validation.isValid) {
          throw new Error(validation.error);
        }

        // Calculate execution price
        const executionPrice = order.type === 'BUY' ? market.ask : market.bid;

        // Create position
        const position: Position = {
          id: Math.random().toString(36).substring(7),
          symbol: order.symbol,
          type: order.type,
          openPrice: executionPrice,
          currentPrice: executionPrice,
          lots: order.volume,
          takeProfit: order.takeProfit,
          stopLoss: order.stopLoss,
          swap: 0,
          commission: -(order.volume * 10), // $10 per lot
          profitLoss: 0,
          openTime: new Date()
        };

        // Add position to store
        usePositionStore.getState().addPosition(position);

      } catch (error) {
        console.error('Order execution failed:', error);
      } finally {
        // Remove processed order from queue
        this.orderQueue.shift();
      }
    }

    this.isProcessing = false;
  }

  private async waitForOrderExecution(order: OrderRequest): Promise<Position> {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        const position = usePositionStore.getState()
          .getAllPositions()
          .find(p => 
            p.symbol === order.symbol && 
            p.type === order.type &&
            p.lots === order.volume
          );

        if (position) {
          clearInterval(checkInterval);
          resolve(position);
        }

        if (!this.orderQueue.includes(order)) {
          clearInterval(checkInterval);
          reject(new Error('Order execution failed'));
        }
      }, 100);
    });
  }

  // Calculate swap charges
  calculateSwap(position: Position): number {
    const rates = this.swapRates[position.symbol];
    if (!rates) return 0;

    const rate = position.type === 'BUY' ? rates.long : rates.short;
    const swapPoints = rate * position.lots;
    
    // Convert swap points to account currency
    return swapPoints * 0.1; // Example conversion rate
  }

  // Update positions with current prices and swaps
  private checkPositions() {
    const positions = usePositionStore.getState().getAllPositions();
    const markets = useMarketStore.getState().markets;
    
    positions.forEach(position => {
      const market = markets[position.symbol];
      if (!market) return;

      const currentPrice = position.type === 'BUY' ? market.bid : market.ask;
      const priceDiff = position.type === 'BUY'
        ? currentPrice - position.openPrice
        : position.openPrice - currentPrice;

      // Calculate swap if position is held overnight
      const swap = this.calculateSwap(position);

      const profitLoss = (priceDiff * position.lots * 100000) +
        position.swap + position.commission;
      
      usePositionStore.getState().updatePosition(position.id, {
        currentPrice,
        swap,
        profitLoss
      });

      // Check stop loss and take profit
      this.checkStopLevels(position, currentPrice);
    });
  }

  private checkStopLevels(position: Position, currentPrice: number) {
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

      // Calculate final P/L including swap
      const closePrice = position.type === 'BUY' ? market.bid : market.ask;
      const priceDiff = position.type === 'BUY'
        ? closePrice - position.openPrice
        : position.openPrice - closePrice;

      const profitLoss = (priceDiff * position.lots * 100000) +
        position.swap + position.commission;

      // Remove position from store
      usePositionStore.getState().removePosition(positionId);

      return true;
    } catch (error) {
      console.error('Failed to close position:', error);
      return false;
    }
  }
}

export const tradingEngine = new TradingEngine();
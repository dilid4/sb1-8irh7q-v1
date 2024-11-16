import { MarginRequirements, LeverageSettings, StopOutSettings, MarginCalculationResult } from '../types/margin';
import { Position } from '../types/trading';
import { useMarketStore } from '../store/marketStore';

class MarginService {
  private leverageSettings: LeverageSettings = {
    default: 100,
    max: 500,
    symbolOverrides: {
      'BTC/USD': 20,
      'ETH/USD': 20
    }
  };

  private stopOutSettings: StopOutSettings = {
    warningLevel: 120,
    stopOutLevel: 50,
    marginCallLevel: 100
  };

  calculatePositionMargin(
    symbol: string,
    volume: number,
    price: number
  ): MarginCalculationResult {
    try {
      const leverage = this.getLeverage(symbol);
      const notionalValue = volume * price * 100000; // Standard lot size
      const margin = notionalValue / leverage;

      return {
        margin,
        leverage,
        notionalValue,
        marginLevel: 0, // Will be calculated based on equity
        hasError: false
      };
    } catch (error) {
      return {
        margin: 0,
        leverage: 0,
        notionalValue: 0,
        marginLevel: 0,
        hasError: true,
        error: error instanceof Error ? error.message : 'Margin calculation failed'
      };
    }
  }

  calculateAccountMargin(
    positions: Position[],
    balance: number,
    credit: number = 0
  ): MarginRequirements {
    let usedMargin = 0;
    const markets = useMarketStore.getState().markets;

    // Calculate used margin for all positions
    positions.forEach(position => {
      const market = markets[position.symbol];
      if (!market) return;

      const price = position.type === 'BUY' ? market.ask : market.bid;
      const result = this.calculatePositionMargin(
        position.symbol,
        position.lots,
        price
      );

      if (!result.hasError) {
        usedMargin += result.margin;
      }
    });

    const equity = balance + credit + this.calculateFloatingPnL(positions);
    const freeMargin = equity - usedMargin;
    const marginLevel = usedMargin > 0 ? (equity / usedMargin) * 100 : 0;

    return {
      required: usedMargin,
      used: usedMargin,
      free: freeMargin,
      level: marginLevel
    };
  }

  private calculateFloatingPnL(positions: Position[]): number {
    let floatingPnL = 0;
    const markets = useMarketStore.getState().markets;

    positions.forEach(position => {
      const market = markets[position.symbol];
      if (!market) return;

      const currentPrice = position.type === 'BUY' ? market.bid : market.ask;
      const priceDiff = position.type === 'BUY'
        ? currentPrice - position.openPrice
        : position.openPrice - currentPrice;

      floatingPnL += priceDiff * position.lots * 100000;
    });

    return floatingPnL;
  }

  checkStopOut(marginLevel: number): boolean {
    return marginLevel <= this.stopOutSettings.stopOutLevel;
  }

  checkMarginCall(marginLevel: number): boolean {
    return marginLevel <= this.stopOutSettings.marginCallLevel;
  }

  checkMarginWarning(marginLevel: number): boolean {
    return marginLevel <= this.stopOutSettings.warningLevel;
  }

  validateNewPosition(
    symbol: string,
    volume: number,
    price: number,
    currentMargin: MarginRequirements
  ): { isValid: boolean; error?: string } {
    const result = this.calculatePositionMargin(symbol, volume, price);
    
    if (result.hasError) {
      return { isValid: false, error: result.error };
    }

    // Check if new position would trigger margin call
    const projectedMarginLevel = (currentMargin.used + result.margin) > 0
      ? ((currentMargin.free + currentMargin.used) / (currentMargin.used + result.margin)) * 100
      : 0;

    if (projectedMarginLevel <= this.stopOutSettings.marginCallLevel) {
      return {
        isValid: false,
        error: 'Insufficient margin for new position'
      };
    }

    return { isValid: true };
  }

  private getLeverage(symbol: string): number {
    return this.leverageSettings.symbolOverrides[symbol] || 
      this.leverageSettings.default;
  }
}

export const marginService = new MarginService();
import { Position } from '../types/trading';
import { MarginRequirements } from '../types/margin';
import { marginService } from './marginService';
import { positionService } from './positionService';
import { useMarketStore } from '../store/marketStore';

class RiskManagementService {
  private isProcessing = false;

  // Stop-out and margin call levels
  private readonly STOP_OUT_LEVEL = 50; // 50% margin level
  private readonly MARGIN_CALL_LEVEL = 100; // 100% margin level
  private readonly WARNING_LEVEL = 120; // 120% margin level

  // Maximum position size limits (in lots)
  private readonly MAX_POSITION_SIZE = {
    forex: 100,
    crypto: 10,
    stocks: 50,
    indices: 20
  };

  async handleStopOut(
    positions: Position[],
    marginRequirements: MarginRequirements
  ): Promise<void> {
    if (this.isProcessing) return;
    
    try {
      this.isProcessing = true;

      if (marginRequirements.level <= this.STOP_OUT_LEVEL) {
        // Sort positions by PnL, close most losing positions first
        const sortedPositions = [...positions].sort((a, b) => 
          a.profitLoss - b.profitLoss
        );

        for (const position of sortedPositions) {
          await positionService.closePosition(position.id);
          
          // Recalculate margin after each position closure
          const updatedMargin = marginService.calculateAccountMargin(
            positions.filter(p => p.id !== position.id),
            marginRequirements.free + marginRequirements.used
          );

          // Stop if margin level is above stop-out
          if (updatedMargin.level > this.STOP_OUT_LEVEL) {
            break;
          }
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  validateNewPosition(
    symbol: string,
    volume: number,
    price: number,
    balance: number,
    existingPositions: Position[]
  ): { isValid: boolean; error?: string } {
    // Check maximum position size
    const marketType = this.getMarketType(symbol);
    if (volume > this.MAX_POSITION_SIZE[marketType]) {
      return {
        isValid: false,
        error: `Maximum position size for ${marketType} is ${this.MAX_POSITION_SIZE[marketType]} lots`
      };
    }

    // Calculate required margin
    const { margin, error } = marginService.calculatePositionMargin(
      symbol,
      volume,
      price
    );

    if (error) {
      return { isValid: false, error };
    }

    // Check if balance would go negative
    const totalExposure = this.calculateTotalExposure(existingPositions);
    if (totalExposure + margin > balance) {
      return {
        isValid: false,
        error: 'Opening this position would exceed available balance'
      };
    }

    // Calculate projected margin level
    const currentMargin = marginService.calculateAccountMargin(
      existingPositions,
      balance
    );

    const projectedLevel = ((currentMargin.free + currentMargin.used) / 
      (currentMargin.used + margin)) * 100;

    if (projectedLevel <= this.MARGIN_CALL_LEVEL) {
      return {
        isValid: false,
        error: 'Insufficient margin for new position'
      };
    }

    return { isValid: true };
  }

  private calculateTotalExposure(positions: Position[]): number {
    const markets = useMarketStore.getState().markets;
    
    return positions.reduce((total, position) => {
      const market = markets[position.symbol];
      if (!market) return total;

      const { margin } = marginService.calculatePositionMargin(
        position.symbol,
        position.lots,
        position.type === 'BUY' ? market.ask : market.bid
      );

      return total + margin;
    }, 0);
  }

  private getMarketType(symbol: string): 'forex' | 'crypto' | 'stocks' | 'indices' {
    if (symbol.includes('/')) {
      return symbol.endsWith('USD') ? 'crypto' : 'forex';
    }
    return symbol.startsWith('^') ? 'indices' : 'stocks';
  }

  getMarginLevels() {
    return {
      stopOut: this.STOP_OUT_LEVEL,
      marginCall: this.MARGIN_CALL_LEVEL,
      warning: this.WARNING_LEVEL
    };
  }

  async monitorPositions(positions: Position[], balance: number): Promise<void> {
    const marginReqs = marginService.calculateAccountMargin(positions, balance);
    await this.handleStopOut(positions, marginReqs);
  }

  validateOrder(order: any, balance: number, positions: Position[]) {
    // Implement order validation logic
    return { isValid: true };
  }
}

export const riskManagementService = new RiskManagementService();
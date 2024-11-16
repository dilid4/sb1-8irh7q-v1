import { LeverageConfig, LeverageUpdate } from '../types/leverage';
import { prisma } from '../db/prisma';

class LeverageService {
  private static defaultConfigs = {
    forex: { default: 200, min: 50, max: 5000 },
    crypto: { default: 20, min: 2, max: 100 },
    stocks: { default: 10, min: 2, max: 20 },
    indices: { default: 50, min: 10, max: 200 },
  };

  async getLeverageConfig(marketType: string): Promise<LeverageConfig | null> {
    return prisma.leverageConfig.findFirst({
      where: { marketType },
      include: { symbolOverrides: true },
    });
  }

  async getSymbolLeverage(symbol: string): Promise<number> {
    const override = await prisma.symbolLeverage.findFirst({
      where: { symbol },
      include: { config: true },
    });

    if (override) {
      return override.leverage;
    }

    const marketType = this.getMarketTypeFromSymbol(symbol);
    const config = await this.getLeverageConfig(marketType);
    return config?.defaultValue || this.getDefaultLeverage(marketType);
  }

  async updateLeverageConfig(
    marketType: string,
    update: LeverageUpdate
  ): Promise<LeverageConfig> {
    const config = await prisma.leverageConfig.update({
      where: { marketType },
      data: {
        defaultValue: update.defaultValue,
        minLeverage: update.minLeverage,
        maxLeverage: update.maxLeverage,
      },
    });

    if (update.symbolOverrides) {
      await Promise.all(
        update.symbolOverrides.map((override) =>
          prisma.symbolLeverage.upsert({
            where: {
              symbol_leverageConfigId: {
                symbol: override.symbol,
                leverageConfigId: config.id,
              },
            },
            update: { leverage: override.leverage },
            create: {
              symbol: override.symbol,
              leverage: override.leverage,
              leverageConfigId: config.id,
            },
          })
        )
      );
    }

    return config;
  }

  private getMarketTypeFromSymbol(symbol: string): string {
    if (symbol.includes('/')) {
      return symbol.endsWith('USD') ? 'crypto' : 'forex';
    }
    return symbol.startsWith('^') ? 'indices' : 'stocks';
  }

  private getDefaultLeverage(marketType: string): number {
    return LeverageService.defaultConfigs[marketType]?.default || 100;
  }
}

export const leverageService = new LeverageService();
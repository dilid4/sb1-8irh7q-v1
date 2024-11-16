import axios from 'axios';
import { format } from 'date-fns';
import { POLYGON_CONFIG } from '../config/polygon';
import { MarketData } from '../types/market';
import { prisma } from '../db/prisma';

class PolygonService {
  private readonly api = axios.create({
    baseURL: POLYGON_CONFIG.BASE_URL,
    params: {
      apiKey: POLYGON_CONFIG.API_KEY
    }
  });

  async getForexPairs(): Promise<MarketData[]> {
    const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'];
    return this.fetchMarketData(pairs, 'forex');
  }

  async getCryptoPairs(): Promise<MarketData[]> {
    const pairs = ['BTC/USD', 'ETH/USD', 'XRP/USD', 'SOL/USD', 'BNB/USD'];
    return this.fetchMarketData(pairs, 'crypto');
  }

  async getStocks(): Promise<MarketData[]> {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
    return this.fetchMarketData(symbols, 'stocks');
  }

  async getIndices(): Promise<MarketData[]> {
    const symbols = ['^SPX', '^NDX', '^DJI', '^VIX', '^FTSE'];
    return this.fetchMarketData(symbols, 'indices');
  }

  private async fetchMarketData(symbols: string[], type: MarketData['type']): Promise<MarketData[]> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const results: MarketData[] = [];

    for (const symbol of symbols) {
      try {
        const formattedSymbol = this.formatSymbol(symbol, type);
        const response = await this.api.get(
          `${POLYGON_CONFIG.FOREX_PATH}/${formattedSymbol}/range/${POLYGON_CONFIG.TIMESPAN}/2023-01-01/${today}`,
          {
            params: {
              limit: POLYGON_CONFIG.LIMIT,
              sort: 'desc'
            }
          }
        );

        const market = this.parseMarketData(response.data, type, symbol);
        
        // Get market availability from database
        const dbMarket = await prisma.market.findUnique({
          where: { symbol }
        });

        results.push({
          ...market,
          isActive: dbMarket?.isActive ?? false
        });
      } catch (error) {
        console.error(`Failed to fetch data for ${symbol}:`, error);
      }
    }

    return results;
  }

  private formatSymbol(symbol: string, type: MarketData['type']): string {
    switch (type) {
      case 'forex':
        return `C:${symbol.replace('/', '')}`;
      case 'crypto':
        return `X:${symbol.replace('/', '')}`;
      case 'stocks':
        return symbol;
      case 'indices':
        return `I:${symbol.replace('^', '')}`;
      default:
        return symbol;
    }
  }

  private parseMarketData(data: any, type: MarketData['type'], originalSymbol: string): MarketData {
    const lastTick = data.results[data.results.length - 1];
    const prevTick = data.results[data.results.length - 2];
    
    const change = lastTick.c - prevTick.c;
    const changePercent = (change / prevTick.c) * 100;

    return {
      symbol: originalSymbol,
      name: this.getMarketName(originalSymbol, type),
      price: lastTick.c,
      change,
      changePercent,
      high: lastTick.h,
      low: lastTick.l,
      volume: lastTick.v,
      type
    };
  }

  private getMarketName(symbol: string, type: MarketData['type']): string {
    const names: Record<string, string> = {
      'EUR/USD': 'Euro / US Dollar',
      'GBP/USD': 'British Pound / US Dollar',
      'USD/JPY': 'US Dollar / Japanese Yen',
      'USD/CHF': 'US Dollar / Swiss Franc',
      'AUD/USD': 'Australian Dollar / US Dollar',
      'BTC/USD': 'Bitcoin / US Dollar',
      'ETH/USD': 'Ethereum / US Dollar',
      'XRP/USD': 'Ripple / US Dollar',
      'SOL/USD': 'Solana / US Dollar',
      'BNB/USD': 'Binance Coin / US Dollar',
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.',
      'META': 'Meta Platforms Inc.',
      '^SPX': 'S&P 500',
      '^NDX': 'Nasdaq 100',
      '^DJI': 'Dow Jones Industrial Average',
      '^VIX': 'CBOE Volatility Index',
      '^FTSE': 'FTSE 100'
    };

    return names[symbol] || symbol;
  }

  async updateMarketAvailability(symbol: string, isActive: boolean): Promise<void> {
    await prisma.market.upsert({
      where: { symbol },
      update: { isActive },
      create: { symbol, isActive }
    });
  }
}

export const polygonService = new PolygonService();
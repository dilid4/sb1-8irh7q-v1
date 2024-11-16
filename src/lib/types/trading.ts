export interface OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP'
}

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  openPrice: number;
  currentPrice: number;
  lots: number;
  takeProfit?: number;
  stopLoss?: number;
  swap: number;
  commission: number;
  profitLoss: number;
  openTime: Date;
}

export interface MarketWatch {
  symbol: string;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  time: Date;
}
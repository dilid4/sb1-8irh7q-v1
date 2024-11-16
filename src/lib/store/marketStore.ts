import { create } from 'zustand';
import { MarketWatch } from '../types/trading';

interface MarketState {
  markets: Record<string, MarketWatch>;
  setMarket: (symbol: string, data: MarketWatch) => void;
  updatePrice: (symbol: string, bid: number, ask: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  markets: {},
  setMarket: (symbol, data) =>
    set((state) => ({
      markets: { ...state.markets, [symbol]: data },
    })),
  updatePrice: (symbol, bid, ask) =>
    set((state) => {
      const market = state.markets[symbol];
      if (!market) return state;

      const change = bid - market.bid;
      const changePercent = (change / market.bid) * 100;

      return {
        markets: {
          ...state.markets,
          [symbol]: {
            ...market,
            bid,
            ask,
            change,
            changePercent,
            high: Math.max(market.high, bid),
            low: Math.min(market.low, bid),
            time: new Date(),
          },
        },
      };
    }),
}));
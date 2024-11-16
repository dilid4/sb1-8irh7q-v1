export interface LeverageConfig {
  id: string;
  marketType: 'forex' | 'crypto' | 'stocks' | 'indices';
  defaultValue: number;
  minLeverage: number;
  maxLeverage: number;
  symbolOverrides?: SymbolLeverage[];
}

export interface SymbolLeverage {
  id: string;
  symbol: string;
  leverage: number;
}

export interface LeverageUpdate {
  marketType?: string;
  defaultValue?: number;
  minLeverage?: number;
  maxLeverage?: number;
  symbolOverrides?: {
    symbol: string;
    leverage: number;
  }[];
}
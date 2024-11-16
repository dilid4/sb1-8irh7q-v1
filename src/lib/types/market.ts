import { z } from 'zod';

export interface MarketData {
  symbol: string;
  name: string;
  type: 'forex' | 'crypto' | 'stocks' | 'indices' | 'commodities';
  price: number;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  isActive: boolean;
  groupId: string;
  accountTypes?: ('standard' | 'vip' | 'manager')[];
  minDeposit?: number;
  maxLeverage?: number;
  spreadType?: 'fixed' | 'variable';
  commission?: number;
}

export interface MarketGroup {
  id: string;
  name: string;
  type: MarketData['type'];
  description: string;
  backgroundImage: string;
  isActive: boolean;
  sortOrder: number;
  defaultSymbol?: string;
  theme?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const marketGroupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['forex', 'crypto', 'stocks', 'indices', 'commodities']),
  description: z.string(),
  backgroundImage: z.string().url('Invalid background image URL'),
  isActive: z.boolean(),
  sortOrder: z.number().min(0),
  defaultSymbol: z.string().optional(),
  theme: z.string().optional()
});
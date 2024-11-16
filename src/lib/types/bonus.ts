export interface BonusRule {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: 'fixed' | 'percentage';
  minDeposit: number;
  maxBonus?: number;
  expiryDays: number;
  tradingRequirement: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBonus {
  id: string;
  userId: string;
  ruleId: string;
  amount: number;
  remainingAmount: number;
  tradingVolume: number;
  requiredVolume: number;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
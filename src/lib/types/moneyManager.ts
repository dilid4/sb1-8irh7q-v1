export interface MoneyManager {
  id: string;
  userId: string;
  name: string;
  description?: string;
  commissionRate: number;
  minAllocation: number;
  maxClients: number;
  isActive: boolean;
  performance: ManagerPerformance;
  createdAt: Date;
  updatedAt: Date;
}

export interface ManagerPerformance {
  totalPnL: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  monthlyReturns: Record<string, number>;
}

export interface ClientAllocation {
  id: string;
  clientId: string;
  managerId: string;
  allocationAmount: number;
  currentValue: number;
  pnl: number;
  commissionPaid: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'closed';
}

export interface CommissionRecord {
  id: string;
  managerId: string;
  clientId: string;
  amount: number;
  calculatedOn: number;
  type: 'monthly' | 'performance';
  status: 'pending' | 'paid';
  createdAt: Date;
  paidAt?: Date;
}

export interface ManagerReport {
  period: string;
  totalClients: number;
  totalAllocation: number;
  totalPnL: number;
  commission: {
    monthly: number;
    performance: number;
    total: number;
  };
  clientPerformance: {
    clientId: string;
    allocation: number;
    pnl: number;
    commission: number;
  }[];
}
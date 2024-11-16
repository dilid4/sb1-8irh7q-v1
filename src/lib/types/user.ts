export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'manager';
  status: 'active' | 'inactive' | 'suspended';
  accountType: 'standard' | 'vip' | 'manager' | 'admin';
  accountBalance: number;
  bonus: number;
  equity: number;
  margin: number;
  marginLevel: number;
  openPositions: number;
  pendingOrders: number;
}

export interface AccountSummary {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  bonus: number;
  profitLoss: number;
}
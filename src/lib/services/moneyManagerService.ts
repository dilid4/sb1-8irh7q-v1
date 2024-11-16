import { MoneyManager, ClientAllocation, CommissionRecord, ManagerReport } from '../types/moneyManager';
import { prisma } from '../db/prisma';

class MoneyManagerService {
  async allocateClient(
    clientId: string,
    managerId: string,
    amount: number
  ): Promise<ClientAllocation> {
    // Validate allocation amount
    const manager = await prisma.moneyManager.findUnique({
      where: { id: managerId }
    });

    if (!manager) {
      throw new Error('Money manager not found');
    }

    if (amount < manager.minAllocation) {
      throw new Error(`Minimum allocation is $${manager.minAllocation}`);
    }

    // Check client count
    const activeAllocations = await prisma.clientAllocation.count({
      where: {
        managerId,
        status: 'active'
      }
    });

    if (activeAllocations >= manager.maxClients) {
      throw new Error('Manager has reached maximum client limit');
    }

    // Create allocation
    return prisma.clientAllocation.create({
      data: {
        clientId,
        managerId,
        allocationAmount: amount,
        currentValue: amount,
        pnl: 0,
        commissionPaid: 0,
        status: 'active',
        startDate: new Date()
      }
    });
  }

  async calculateCommissions(managerId: string): Promise<CommissionRecord[]> {
    const manager = await prisma.moneyManager.findUnique({
      where: { id: managerId },
      include: {
        allocations: {
          where: { status: 'active' }
        }
      }
    });

    if (!manager) {
      throw new Error('Money manager not found');
    }

    const commissions: CommissionRecord[] = [];

    // Calculate monthly commissions
    for (const allocation of manager.allocations) {
      const monthlyAmount = (allocation.currentValue * manager.commissionRate) / 12;
      
      commissions.push({
        id: Math.random().toString(36).substring(7),
        managerId,
        clientId: allocation.clientId,
        amount: monthlyAmount,
        calculatedOn: allocation.currentValue,
        type: 'monthly',
        status: 'pending',
        createdAt: new Date()
      });

      // Calculate performance commission if profitable
      if (allocation.pnl > 0) {
        const performanceAmount = allocation.pnl * (manager.commissionRate / 2);
        
        commissions.push({
          id: Math.random().toString(36).substring(7),
          managerId,
          clientId: allocation.clientId,
          amount: performanceAmount,
          calculatedOn: allocation.pnl,
          type: 'performance',
          status: 'pending',
          createdAt: new Date()
        });
      }
    }

    // Save commission records
    await prisma.commissionRecord.createMany({
      data: commissions
    });

    return commissions;
  }

  async generateReport(managerId: string, period: string): Promise<ManagerReport> {
    const manager = await prisma.moneyManager.findUnique({
      where: { id: managerId },
      include: {
        allocations: {
          where: { status: 'active' }
        },
        commissions: {
          where: {
            createdAt: {
              gte: new Date(period)
            }
          }
        }
      }
    });

    if (!manager) {
      throw new Error('Money manager not found');
    }

    const totalAllocation = manager.allocations.reduce(
      (sum, allocation) => sum + allocation.allocationAmount,
      0
    );

    const totalPnL = manager.allocations.reduce(
      (sum, allocation) => sum + allocation.pnl,
      0
    );

    const monthlyCommission = manager.commissions
      .filter(c => c.type === 'monthly')
      .reduce((sum, c) => sum + c.amount, 0);

    const performanceCommission = manager.commissions
      .filter(c => c.type === 'performance')
      .reduce((sum, c) => sum + c.amount, 0);

    return {
      period,
      totalClients: manager.allocations.length,
      totalAllocation,
      totalPnL,
      commission: {
        monthly: monthlyCommission,
        performance: performanceCommission,
        total: monthlyCommission + performanceCommission
      },
      clientPerformance: manager.allocations.map(allocation => ({
        clientId: allocation.clientId,
        allocation: allocation.allocationAmount,
        pnl: allocation.pnl,
        commission: manager.commissions
          .filter(c => c.clientId === allocation.clientId)
          .reduce((sum, c) => sum + c.amount, 0)
      }))
    };
  }

  async updatePerformance(managerId: string): Promise<void> {
    const manager = await prisma.moneyManager.findUnique({
      where: { id: managerId },
      include: {
        allocations: true,
        trades: {
          orderBy: { openTime: 'desc' },
          take: 100
        }
      }
    });

    if (!manager) {
      throw new Error('Money manager not found');
    }

    const trades = manager.trades;
    const winningTrades = trades.filter(t => t.profitLoss > 0);
    
    const performance = {
      totalPnL: trades.reduce((sum, t) => sum + t.profitLoss, 0),
      winRate: (winningTrades.length / trades.length) * 100,
      averageWin: winningTrades.reduce((sum, t) => sum + t.profitLoss, 0) / winningTrades.length,
      averageLoss: trades
        .filter(t => t.profitLoss < 0)
        .reduce((sum, t) => sum + t.profitLoss, 0) / (trades.length - winningTrades.length),
      profitFactor: Math.abs(
        winningTrades.reduce((sum, t) => sum + t.profitLoss, 0) /
        trades
          .filter(t => t.profitLoss < 0)
          .reduce((sum, t) => sum + t.profitLoss, 0)
      ),
      sharpeRatio: this.calculateSharpeRatio(trades),
      maxDrawdown: this.calculateMaxDrawdown(trades),
      monthlyReturns: this.calculateMonthlyReturns(trades)
    };

    await prisma.moneyManager.update({
      where: { id: managerId },
      data: { performance }
    });
  }

  private calculateSharpeRatio(trades: any[]): number {
    // Implementation of Sharpe ratio calculation
    return 0;
  }

  private calculateMaxDrawdown(trades: any[]): number {
    // Implementation of maximum drawdown calculation
    return 0;
  }

  private calculateMonthlyReturns(trades: any[]): Record<string, number> {
    // Implementation of monthly returns calculation
    return {};
  }
}

export const moneyManagerService = new MoneyManagerService();
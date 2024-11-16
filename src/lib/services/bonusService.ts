import { BonusRule, UserBonus } from '../types/bonus';
import { prisma } from '../db/prisma';

class BonusService {
  async createBonusRule(rule: Omit<BonusRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<BonusRule> {
    return prisma.bonusRule.create({
      data: {
        name: rule.name,
        description: rule.description,
        amount: rule.amount,
        type: rule.type,
        minDeposit: rule.minDeposit,
        maxBonus: rule.maxBonus,
        expiryDays: rule.expiryDays,
        tradingRequirement: rule.tradingRequirement,
        isActive: rule.isActive
      }
    });
  }

  async assignWelcomeBonus(userId: string): Promise<UserBonus | null> {
    const welcomeBonus = await prisma.bonusRule.findFirst({
      where: {
        name: 'Welcome Bonus',
        isActive: true
      }
    });

    if (!welcomeBonus) return null;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + welcomeBonus.expiryDays);

    return prisma.userBonus.create({
      data: {
        userId,
        ruleId: welcomeBonus.id,
        amount: welcomeBonus.amount,
        remainingAmount: welcomeBonus.amount,
        tradingVolume: 0,
        requiredVolume: welcomeBonus.tradingRequirement,
        status: 'active',
        expiryDate
      }
    });
  }

  async updateTradingVolume(userId: string, volume: number): Promise<void> {
    const activeBonuses = await prisma.userBonus.findMany({
      where: {
        userId,
        status: 'active',
        expiryDate: { gt: new Date() }
      }
    });

    for (const bonus of activeBonuses) {
      const newVolume = bonus.tradingVolume + volume;
      
      if (newVolume >= bonus.requiredVolume) {
        // Bonus requirements met
        await prisma.userBonus.update({
          where: { id: bonus.id },
          data: {
            tradingVolume: newVolume,
            status: 'completed'
          }
        });
      } else {
        // Update trading volume
        await prisma.userBonus.update({
          where: { id: bonus.id },
          data: {
            tradingVolume: newVolume
          }
        });
      }
    }
  }

  async checkBonusExpiration(): Promise<void> {
    await prisma.userBonus.updateMany({
      where: {
        status: 'active',
        expiryDate: { lt: new Date() }
      },
      data: {
        status: 'expired'
      }
    });
  }

  async getUserBonuses(userId: string): Promise<UserBonus[]> {
    return prisma.userBonus.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async cancelBonus(bonusId: string): Promise<boolean> {
    try {
      await prisma.userBonus.update({
        where: { id: bonusId },
        data: { status: 'cancelled' }
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const bonusService = new BonusService();
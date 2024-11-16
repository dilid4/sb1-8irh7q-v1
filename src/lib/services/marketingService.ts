import { LandingPage, ExternalRegistration, ReferralCode } from '../types/marketing';
import { bonusService } from './bonusService';
import { prisma } from '../db/prisma';

class MarketingService {
  async createLandingPage(data: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt' | 'visits' | 'registrations'>): Promise<LandingPage> {
    return prisma.landingPage.create({
      data: {
        ...data,
        visits: 0,
        registrations: 0
      }
    });
  }

  async trackPageVisit(landingPageId: string, ip: string): Promise<void> {
    await prisma.landingPage.update({
      where: { id: landingPageId },
      data: {
        visits: { increment: 1 },
        pageVisits: {
          create: {
            ip,
            timestamp: new Date()
          }
        }
      }
    });
  }

  async handleExternalRegistration(data: ExternalRegistration): Promise<{ success: boolean; userId?: string; error?: string }> {
    try {
      // Create user with default password
      const user = await prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: 'Password@123!', // Will be changed on first login
          status: 'pending',
          moneyManagerId: data.moneyManagerId
        }
      });

      // Increment landing page registrations
      await prisma.landingPage.update({
        where: { id: data.landingPageId },
        data: { registrations: { increment: 1 } }
      });

      // Assign welcome bonus
      const landingPage = await prisma.landingPage.findUnique({
        where: { id: data.landingPageId }
      });

      if (landingPage) {
        await bonusService.assignWelcomeBonus(user.id, landingPage.bonusAmount);
      }

      // Handle referral if provided
      if (data.referralCode) {
        await this.handleReferralRegistration(data.referralCode, user.id);
      }

      return { success: true, userId: user.id };
    } catch (error) {
      console.error('External registration failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  async createReferralCode(userId: string, bonusAmount: number): Promise<ReferralCode> {
    const code = this.generateReferralCode();
    
    return prisma.referralCode.create({
      data: {
        code,
        userId,
        bonusAmount,
        isActive: true
      }
    });
  }

  private async handleReferralRegistration(code: string, newUserId: string): Promise<void> {
    const referralCode = await prisma.referralCode.findUnique({
      where: { code }
    });

    if (!referralCode || !referralCode.isActive) {
      throw new Error('Invalid referral code');
    }

    if (referralCode.maxUses && referralCode.usageCount >= referralCode.maxUses) {
      throw new Error('Referral code has reached maximum uses');
    }

    if (referralCode.expiryDate && referralCode.expiryDate < new Date()) {
      throw new Error('Referral code has expired');
    }

    // Update usage count
    await prisma.referralCode.update({
      where: { id: referralCode.id },
      data: { usageCount: { increment: 1 } }
    });

    // Assign bonus to referrer
    await bonusService.assignReferralBonus(referralCode.userId, referralCode.bonusAmount);

    // Create referral relationship
    await prisma.referral.create({
      data: {
        referrerId: referralCode.userId,
        referredId: newUserId,
        referralCodeId: referralCode.id
      }
    });
  }

  private generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}

export const marketingService = new MarketingService();
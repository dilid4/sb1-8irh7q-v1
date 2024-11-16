export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  bonusAmount: number;
  moneyManagerId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  visits: number;
  registrations: number;
}

export interface ExternalRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  landingPageId: string;
  moneyManagerId?: string;
  ip: string;
  userAgent: string;
  referralCode?: string;
}

export interface ReferralCode {
  id: string;
  code: string;
  userId: string;
  bonusAmount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  maxUses?: number;
  expiryDate?: Date;
}
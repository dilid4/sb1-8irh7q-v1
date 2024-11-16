import { RiskSettings, RiskSettingsUpdate } from '../types/riskManagement';
import { prisma } from '../db/prisma';

class AdminRiskService {
  async getRiskSettings(): Promise<RiskSettings> {
    const settings = await prisma.riskSettings.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    });

    if (!settings) {
      throw new Error('No active risk settings found');
    }

    return settings;
  }

  async updateRiskSettings(
    update: RiskSettingsUpdate,
    adminId: string
  ): Promise<RiskSettings> {
    // Validate settings
    this.validateSettings(update);

    const settings = await prisma.riskSettings.create({
      data: {
        ...update,
        isActive: true,
        updatedBy: adminId
      }
    });

    // Deactivate previous settings
    await prisma.riskSettings.updateMany({
      where: {
        id: { not: settings.id },
        isActive: true
      },
      data: { isActive: false }
    });

    return settings;
  }

  private validateSettings(settings: RiskSettingsUpdate) {
    if (settings.stopOutLevel) {
      if (settings.stopOutLevel < 0 || settings.stopOutLevel > 100) {
        throw new Error('Stop-out level must be between 0 and 100');
      }
    }

    if (settings.marginCallLevel) {
      if (settings.marginCallLevel < settings.stopOutLevel!) {
        throw new Error('Margin call level must be higher than stop-out level');
      }
    }

    if (settings.warningLevel) {
      if (settings.warningLevel < settings.marginCallLevel!) {
        throw new Error('Warning level must be higher than margin call level');
      }
    }

    if (settings.maxDrawdown) {
      if (settings.maxDrawdown < 0 || settings.maxDrawdown > 100) {
        throw new Error('Maximum drawdown must be between 0 and 100');
      }
    }

    // Validate position sizes and leverage
    const validateNumericLimits = (
      value: number,
      min: number,
      max: number,
      field: string
    ) => {
      if (value < min || value > max) {
        throw new Error(`${field} must be between ${min} and ${max}`);
      }
    };

    if (settings.maxPositionSize) {
      Object.entries(settings.maxPositionSize).forEach(([market, size]) => {
        validateNumericLimits(size!, 0.01, 1000, `${market} position size`);
      });
    }

    if (settings.maxLeverage) {
      Object.entries(settings.maxLeverage).forEach(([market, leverage]) => {
        validateNumericLimits(leverage!, 1, 5000, `${market} leverage`);
      });
    }
  }
}

export const adminRiskService = new AdminRiskService();
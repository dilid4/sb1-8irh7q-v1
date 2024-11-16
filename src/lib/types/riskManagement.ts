export interface RiskSettings {
  id: string;
  stopOutLevel: number;
  marginCallLevel: number;
  warningLevel: number;
  maxPositionSize: {
    forex: number;
    crypto: number;
    stocks: number;
    indices: number;
  };
  maxDrawdown: number;
  maxLeverage: {
    forex: number;
    crypto: number;
    stocks: number;
    indices: number;
  };
  isActive: boolean;
  updatedAt: Date;
  updatedBy: string;
}

export interface RiskSettingsUpdate {
  stopOutLevel?: number;
  marginCallLevel?: number;
  warningLevel?: number;
  maxPositionSize?: {
    forex?: number;
    crypto?: number;
    stocks?: number;
    indices?: number;
  };
  maxDrawdown?: number;
  maxLeverage?: {
    forex?: number;
    crypto?: number;
    stocks?: number;
    indices?: number;
  };
}
export interface MarginRequirements {
  required: number;
  used: number;
  free: number;
  level: number;
}

export interface LeverageSettings {
  default: number;
  max: number;
  symbolOverrides: Record<string, number>;
}

export interface StopOutSettings {
  warningLevel: number;  // e.g., 120% - warning notification
  stopOutLevel: number;  // e.g., 50% - force close positions
  marginCallLevel: number; // e.g., 100% - prevent new positions
}

export interface MarginCalculationResult {
  margin: number;
  leverage: number;
  notionalValue: number;
  marginLevel: number;
  hasError: boolean;
  error?: string;
}
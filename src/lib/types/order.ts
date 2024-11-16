export interface OrderRequest {
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  orderType: 'MARKET' | 'LIMIT' | 'STOP';
  price?: number;
  takeProfit?: number;
  stopLoss?: number;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
  position?: {
    id: string;
    openPrice: number;
    volume: number;
  };
}

export interface OrderValidation {
  isValid: boolean;
  error?: string;
  requiredMargin?: number;
  maxVolume?: number;
}
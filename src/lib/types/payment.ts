export interface BTCAddress {
  id: string;
  address: string;
  label: string;
  isMain: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deposit {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'rejected';
  txHash?: string;
  btcAddress?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  method: 'btc' | 'bank';
  destination: string;
  bankDetails?: BankDetails;
  createdAt: Date;
  processedAt?: Date;
}

export interface BankDetails {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  iban?: string;
  country: string;
  bankAddress?: string;
}
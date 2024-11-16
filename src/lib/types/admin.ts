export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  accountType: 'standard' | 'vip' | 'manager';
  balance: number;
  bonus: number;
  registeredAt: Date;
  lastLogin: Date;
  kycStatus: 'pending' | 'approved' | 'rejected';
  moneyManager?: string;
}

export interface UserFilter {
  status?: AdminUser['status'];
  accountType?: AdminUser['accountType'];
  kycStatus?: AdminUser['kycStatus'];
  moneyManager?: string;
  search?: string;
}

export interface UserSort {
  field: keyof AdminUser;
  direction: 'asc' | 'desc';
}
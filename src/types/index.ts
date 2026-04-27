export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  coin_balance: number;
  star_balance: number;
  is_active: boolean;
  is_premium: boolean;
  region: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

// pagination
export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: any[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta?: PaginationMeta;
}

// coin package
export interface CoinPackageType {
  id: number;
  name: string;
  desc: string;
  coin_amount: number;
  price: number;
  currency: string;
  image: string | null;
  is_active: boolean;
  created_admin_id: number;
  updated_admin_id: number;
  created_at: string;
  updated_at: string;
}

// payment
export interface PaymentType {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// deposit
export interface DepositType {
  id: number;
  user_id: number;
  payment_type_id: number;
  payment_account_id: number;
  coin_package_id: number;
  coin_amount: number;
  price: string;
  status: "pending" | "approved" | "rejected";
  depositor_name: string;
  transaction_no: string;
  transaction_image: string | null;
  transferred_at: string;
  processed_by: number | null;
  processed_at: string | null;
  note: string | null;
  user: User;
  coin_package: CoinPackageType;
  payment_type: PaymentType;
  payment_account: PaymentAccount;
  processed_admin: AdminUser | null;
  created_at: string;
  updated_at: string;
}

// withdrawal
export interface WithdrawalType {
  id: number;
  user_id: number;
  payment_type_id: number;
  payment_account_id: number;
  account_name: string;
  account_number: string;
  coin_amount: number;
  status: "pending" | "approved" | "rejected";
  processed_by: number | null;
  processed_at: string | null;
  note: string | null;
  user: User;
  payment_type: PaymentType;
  payment_account: PaymentAccount;
  processed_admin: AdminUser | null;
  created_at: string;
  updated_at: string;
}

// payment account
export interface PaymentAccount {
  id: number;
  user_id: number | null;
  payment_type_id: number;
  account_name: string;
  account_number: string;
  qr_code: string | null;
  note: string | null;
  is_active: boolean;
  priority: number;
  payment_type: PaymentType;
  user: AdminUser | null;
  created_at: string;
  updated_at: string;
}

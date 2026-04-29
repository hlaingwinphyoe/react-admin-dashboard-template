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
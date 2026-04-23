export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
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

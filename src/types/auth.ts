import { AdminUser } from ".";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginData {
  user: AdminUser;
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RefreshTokenData {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

import { ApiResponse, AdminUser } from "@/types";
import api from "../lib/axios";
import {
  LoginCredentials,
  LoginData,
  RefreshTokenData,
} from "@/types/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginData>> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse<RefreshTokenData>> => {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  },

  getUserProfile: async (): Promise<ApiResponse<AdminUser>> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

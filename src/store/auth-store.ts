import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminUser } from "@/types";
import { authService } from "../api/auth-service";
import { LoginCredentials } from "@/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAccessToken: (token: string | null) => void;
  setUser: (user: AdminUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,

      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.login(credentials);
          const token = response.data?.access_token;
          const user = response.data?.user;

          set({
            accessToken: token,
            user: user,
            isAuthenticated: true,
          });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Login failed";
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await authService.logout();
        } catch (error) {
          console.error("Logout API failed:", error);
        } finally {
          get().clearAuth();
          set({ isLoading: false });
        }
      },

      refreshToken: async () => {
        try {
          const response = await authService.refreshToken();
          const token = response.data?.access_token;
          
          if (token) {
            set({ accessToken: token });
          }
        } catch (error) {
          get().clearAuth();
          throw error;
        }
      },

      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          error: null,
        });
      },
    }),
    {
      name: "admin-auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

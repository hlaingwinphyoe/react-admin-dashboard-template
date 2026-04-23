import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/store/auth-store";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/admin";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  try {
    // use accessToken only not accessTokenValue
    const token = useAuthStore.getState().accessToken;

    if (token) {
      const headers = new AxiosHeaders(config.headers ?? {});
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }
  } catch {
    // Silently fail if store access errors
  }

  return config;
});

// ─── Refresh Token Logic ──────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error || !token) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Dedicated instance — avoid interceptor loop
// withCredentials: true to pass httpOnly refresh_token cookie
const refreshInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // avoid loop on refresh-token 401 response
    if (originalRequest?.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      // queue other requests until refresh completes
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            const headers = new AxiosHeaders(originalRequest.headers ?? {});
            headers.set("Authorization", `Bearer ${token}`);
            originalRequest.headers = headers;
            return api(originalRequest);
          })
          .catch(Promise.reject.bind(Promise));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // get new access_token from refresh_token cookie
        const { data } = await refreshInstance.post("/auth/refresh-token");

        const newToken: string | undefined = data.data?.access_token;

        if (!newToken) throw new Error("No access_token in refresh response");

        // Store update
        useAuthStore.getState().setAccessToken(newToken);

        // retry queued requests with new token
        processQueue(null, newToken);

        // Original request retry
        const headers = new AxiosHeaders(originalRequest.headers ?? {});
        headers.set("Authorization", `Bearer ${newToken}`);
        originalRequest.headers = headers;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        useAuthStore.getState().clearAuth();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

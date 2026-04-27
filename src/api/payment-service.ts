import {
  ApiResponse,
  DepositType,
  PaginationMeta,
  PaymentAccount,
  PaymentType,
  WithdrawalType,
} from "@/types";
import api from "../lib/axios";

// deposit
export const depositService = {
  getDeposits: async (params?: {
    user_id?: number;
    payment_account_id?: number;
    amount?: number;
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<
    ApiResponse<{ data: DepositType[]; meta: PaginationMeta; links: any }>
  > => {
    const response = await api.get("/deposits", { params });
    return response.data;
  },

  approveDeposit: async (
    id: number,
    note?: string,
  ): Promise<ApiResponse<null>> => {
    const response = await api.patch(`/deposits/${id}/approve`, { note });
    return response.data;
  },

  rejectDeposit: async (
    id: number,
    note?: string,
  ): Promise<ApiResponse<null>> => {
    const response = await api.patch(`/deposits/${id}/reject`, { note });
    return response.data;
  },
};

// withdrawal
export const withdrawalService = {
  getWithdrawals: async (params?: {
    user_id?: number;
    payment_account_id?: number;
    amount?: number;
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<
    ApiResponse<{ data: WithdrawalType[]; meta: PaginationMeta; links: any }>
  > => {
    const response = await api.get("/withdrawals", { params });
    return response.data;
  },

  approveWithdrawal: async (
    id: number,
    note?: string,
  ): Promise<ApiResponse<null>> => {
    const response = await api.patch(`/withdrawals/${id}/approve`, { note });
    return response.data;
  },

  rejectWithdrawal: async (
    id: number,
    note?: string,
  ): Promise<ApiResponse<null>> => {
    const response = await api.patch(`/withdrawals/${id}/reject`, { note });
    return response.data;
  },
};

// payment account
export const paymentAccountService = {
  getPaymentAccounts: async (params?: {
    q?: string;
    is_active?: string;
    page?: number;
    per_page?: number;
  }): Promise<
    ApiResponse<{ data: PaymentAccount[]; meta: PaginationMeta; links: any }>
  > => {
    const response = await api.get("/payment-accounts", { params });
    return response.data;
  },

  getPaymentTypes: async (): Promise<ApiResponse<PaymentType[]>> => {
    const response = await api.get("/payment-types");
    return response.data;
  },

  createPaymentAccount: async (
    data: FormData,
  ): Promise<ApiResponse<PaymentAccount>> => {
    const response = await api.post("/payment-accounts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updatePaymentAccount: async (
    id: number,
    data: FormData,
  ): Promise<ApiResponse<PaymentAccount>> => {
    data.append("_method", "PATCH");
    const response = await api.post(`/payment-accounts/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deletePaymentAccount: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/payment-accounts/${id}`);
    return response.data;
  },

  togglePaymentAccountStatus: async (
    id: number,
  ): Promise<ApiResponse<PaymentAccount>> => {
    const response = await api.patch(`/payment-accounts/${id}/toggle-active`);
    return response.data;
  },
};

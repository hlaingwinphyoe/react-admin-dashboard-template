import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentAccountService } from "@/api/payment-service";
import { toast } from "sonner";

export const usePaymentAccounts = (params: {
  q?: string;
  is_active?: string;
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["payment-accounts", params],
    queryFn: () => paymentAccountService.getPaymentAccounts(params),
  });
};

export const usePaymentTypes = () => {
  return useQuery({
    queryKey: ["payment-types"],
    queryFn: () => paymentAccountService.getPaymentTypes(),
  });
};

export const usePaymentAccountMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: FormData) =>
      paymentAccountService.createPaymentAccount(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
      toast.success(res.message || "Payment account created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create payment account",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      paymentAccountService.updatePaymentAccount(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
      toast.success(res.message || "Payment account updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update payment account",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => paymentAccountService.deletePaymentAccount(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
      toast.success(res.message || "Payment account deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete payment account",
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) =>
      paymentAccountService.togglePaymentAccountStatus(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
      toast.success(res.message || "Status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    toggleStatusMutation,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { withdrawalService } from "@/api/payment-service";
import { toast } from "sonner";

export const useWithdrawals = (params: {
  user_id?: number;
  payment_account_id?: number;
  amount?: number;
  status?: string;
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["withdrawals", params],
    queryFn: () => withdrawalService.getWithdrawals(params),
  });
};

export const useWithdrawalMutations = () => {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: ({ id, note }: { id: number; note?: string }) =>
      withdrawalService.approveWithdrawal(id, note),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      toast.success(res.message || "Withdrawal approved successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to approve withdrawal");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, note }: { id: number; note?: string }) =>
      withdrawalService.rejectWithdrawal(id, note),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      toast.success(res.message || "Withdrawal rejected successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reject withdrawal");
    },
  });

  return {
    approveMutation,
    rejectMutation,
  };
};

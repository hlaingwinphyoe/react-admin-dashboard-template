import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { depositService } from "@/api/payment-service";
import { toast } from "sonner";

export const useDeposits = (params: {
  user_id?: number;
  payment_account_id?: number;
  amount?: number;
  status?: string;
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["deposits", params],
    queryFn: () => depositService.getDeposits(params),
  });
};

export const useDepositMutations = () => {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: ({ id, note }: { id: number; note?: string }) =>
      depositService.approveDeposit(id, note),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      toast.success(res.message || "Deposit approved successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to approve deposit");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, note }: { id: number; note?: string }) =>
      depositService.rejectDeposit(id, note),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      toast.success(res.message || "Deposit rejected successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reject deposit");
    },
  });

  return {
    approveMutation,
    rejectMutation,
  };
};

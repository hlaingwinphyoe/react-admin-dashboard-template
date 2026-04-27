import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { WithdrawalType } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import { useWithdrawals, useWithdrawalMutations } from "./hooks/useWithdrawals";
import WithdrawalTable from "./components/WithdrawalTable";
import WithdrawalFilters from "./components/WithdrawalFilters";
import WithdrawalDetailDialog from "./components/WithdrawalDetailDialog";

function WithdrawalIndex() {
  const [params, setParams] = useState({
    status: "",
    page: 1,
    per_page: 10,
  });

  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data, isLoading } = useWithdrawals(params);
  const { approveMutation, rejectMutation } = useWithdrawalMutations();
  const queryClient = useQueryClient();

  const handleStatusChange = (status: string) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleReset = () => {
    setParams({
      status: "",
      page: 1,
      per_page: 10,
    });
    queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
  };

  const handleViewDetail = (withdrawal: WithdrawalType) => {
    setSelectedWithdrawal(withdrawal);
    setIsDetailOpen(true);
  };

  const handleApprove = (id: number, note: string) => {
    approveMutation.mutate(
      { id, note },
      {
        onSuccess: () => setIsDetailOpen(false),
      }
    );
  };

  const handleReject = (id: number, note: string) => {
    rejectMutation.mutate(
      { id, note },
      {
        onSuccess: () => setIsDetailOpen(false),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <WithdrawalFilters
          status={params.status}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
      </div>

      <WithdrawalTable
        withdrawals={data?.data?.data || []}
        isLoading={isLoading}
        onView={handleViewDetail}
        currentPage={data?.data?.meta?.current_page}
        perPage={data?.data?.meta?.per_page}
      />

      {data?.data?.meta && (
        <Pagination
          meta={data.data.meta}
          onPageChange={(page: number) => setParams((prev) => ({ ...prev, page }))}
          onPerPageChange={(per_page: number) =>
            setParams((prev) => ({ ...prev, per_page, page: 1 }))
          }
        />
      )}

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <WithdrawalDetailDialog
          withdrawal={selectedWithdrawal}
          onApprove={handleApprove}
          onReject={handleReject}
          isProcessing={approveMutation.isPending || rejectMutation.isPending}
        />
      </Dialog>
    </div>
  );
}

export default WithdrawalIndex;

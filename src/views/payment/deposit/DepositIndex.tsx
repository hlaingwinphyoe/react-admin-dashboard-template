import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DepositType } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import { useDeposits, useDepositMutations } from "./hooks/useDeposits";
import DepositTable from "./components/DepositTable";
import DepositFilters from "./components/DepositFilters";
import DepositDetailDialog from "./components/DepositDetailDialog";

function DepositIndex() {
  const [params, setParams] = useState({
    status: "",
    page: 1,
    per_page: 10,
  });

  const [selectedDeposit, setSelectedDeposit] = useState<DepositType | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data, isLoading } = useDeposits(params);
  const { approveMutation, rejectMutation } = useDepositMutations();
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
    queryClient.invalidateQueries({ queryKey: ["deposits"] });
  };

  const handleViewDetail = (deposit: DepositType) => {
    setSelectedDeposit(deposit);
    setIsDetailOpen(true);
  };

  const handleApprove = (id: number, note: string) => {
    approveMutation.mutate(
      { id, note },
      {
        onSuccess: () => setIsDetailOpen(false),
      },
    );
  };

  const handleReject = (id: number, note: string) => {
    rejectMutation.mutate(
      { id, note },
      {
        onSuccess: () => setIsDetailOpen(false),
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <DepositFilters
          status={params.status}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
      </div>

      <DepositTable
        deposits={data?.data?.data || []}
        isLoading={isLoading}
        onView={handleViewDetail}
        currentPage={data?.data?.meta?.current_page}
        perPage={data?.data?.meta?.per_page}
      />

      {data?.data?.meta && (
        <Pagination
          meta={data.data.meta}
          onPageChange={(page: number) =>
            setParams((prev) => ({ ...prev, page }))
          }
          onPerPageChange={(per_page: number) =>
            setParams((prev) => ({ ...prev, per_page, page: 1 }))
          }
        />
      )}

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DepositDetailDialog
          deposit={selectedDeposit}
          onApprove={handleApprove}
          onReject={handleReject}
          isProcessing={approveMutation.isPending || rejectMutation.isPending}
        />
      </Dialog>
    </div>
  );
}

export default DepositIndex;

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaymentAccount } from "@/types";

import PaymentAccountTable from "./components/PaymentAccountTable";
import PaymentAccountForm from "./components/PaymentAccountForm";
import PaymentAccountFilters from "./components/PaymentAccountFilters";
import { Pagination } from "@/components/ui/pagination";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import {
  usePaymentAccountMutations,
  usePaymentAccounts,
  usePaymentTypes,
} from "./hooks/usePaymentAccounts";

function PaymentAccountIndex() {
  const [params, setParams] = useState({
    q: "",
    is_active: "",
    page: 1,
    per_page: 10,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingAccount, setEditingAccount] = useState<PaymentAccount | null>(
    null,
  );

  const { data, isLoading } = usePaymentAccounts(params);
  const { data: paymentTypesData } = usePaymentTypes();
  const queryClient = useQueryClient();
  const {
    createMutation,
    updateMutation,
    deleteMutation,
    toggleStatusMutation,
  } = usePaymentAccountMutations();

  const handleSearchChange = (q: string) => {
    setParams((prev) => ({ ...prev, q, page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    setParams((prev) => ({ ...prev, is_active: status, page: 1 }));
  };

  const handleReset = () => {
    setParams({
      q: "",
      is_active: "",
      page: 1,
      per_page: 10,
    });
    queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
  };

  const handleOpenCreate = () => {
    setEditingAccount(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (account: PaymentAccount) => {
    setEditingAccount(account);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (formData: FormData) => {
    if (editingAccount) {
      updateMutation.mutate(
        { id: editingAccount.id, data: formData },
        {
          onSuccess: () => setIsDialogOpen(false),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsDialogOpen(false),
      });
    }
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeletingId(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PaymentAccountFilters
          q={params.q}
          status={params.is_active}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4" />
          Add Account
        </Button>
      </div>

      {/* Table */}
      <PaymentAccountTable
        accounts={data?.data?.data || []}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
        currentPage={data?.data?.meta?.current_page}
        perPage={data?.data?.meta?.per_page}
      />

      {/* Pagination */}
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAccount
                ? "Edit Payment Account"
                : "Create Payment Account"}
            </DialogTitle>
          </DialogHeader>
          <PaymentAccountForm
            initialData={editingAccount}
            paymentTypes={paymentTypesData?.data || []}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        title="Delete Payment Account"
        description="Are you sure you want to delete this payment account? This action cannot be undone."
      />
    </div>
  );
}

export default PaymentAccountIndex;

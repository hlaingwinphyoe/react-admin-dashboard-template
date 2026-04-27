import { useState } from "react";
import { DepositType } from "@/types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, User, Hash, FileText, CreditCard } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface DepositDetailDialogProps {
  deposit: DepositType | null;
  onApprove: (id: number, note: string) => void;
  onReject: (id: number, note: string) => void;
  isProcessing: boolean;
}

const statusVariants: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  approved: "bg-green-500/10 text-green-500 border-green-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

const DepositDetailDialog = ({
  deposit,
  onApprove,
  onReject,
  isProcessing,
}: DepositDetailDialogProps) => {
  const [adminNote, setAdminNote] = useState("");

  if (!deposit) return null;

  return (
    <DialogContent className="max-w-2xl!">
      <DialogHeader>
        <div className="flex items-center justify-between pr-8">
          <DialogTitle className="text-xl font-bold">
            Deposit Details
          </DialogTitle>
          <Badge variant="outline" className={statusVariants[deposit.status]}>
            {deposit.status.toUpperCase()}
          </Badge>
        </div>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        {/* Transaction Info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FileText className="size-4" /> Transaction Info
            </h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Payment Method
                </span>
                <span className="font-medium">
                  {deposit.payment_type?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Transaction ID
                </span>
                <span className="font-medium">{deposit.transaction_no}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Depositor</span>
                <span className="font-medium">{deposit.depositor_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Transfer Date
                </span>
                <span className="text-sm">{deposit.transferred_at}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="size-4" /> Amount & Package
            </h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Package</span>
                <span className="font-medium">{deposit.coin_package.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Coins</span>
                <span className="text-lg font-bold text-primary">
                  {formatNumber(deposit.coin_amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium">
                  {formatNumber(+deposit.price)} {deposit.coin_package.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Image */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Hash className="size-4" /> Payment Proof
          </h3>
          <div className="relative aspect-5/6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {deposit.transaction_image ? (
              <img
                src={deposit.transaction_image}
                alt="Transaction Proof"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No transaction image uploaded
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {deposit.note && (
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              User Note
            </h3>
            <p className="text-sm">{deposit.note}</p>
          </div>
        )}

        {deposit.status === "pending" && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Admin Note
            </h3>
            <Textarea
              placeholder="Add a note (e.g., reason for rejection)..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="min-h-[80px] rounded-xl border-white/10 bg-white/5 focus:bg-white/10"
            />
          </div>
        )}
      </div>

      {deposit.status === "pending" && (
        <DialogFooter className="gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
            onClick={() => onReject(deposit.id, adminNote)}
            disabled={isProcessing}
          >
            <X className="mr-2 size-4" /> Reject Deposit
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onApprove(deposit.id, adminNote)}
            disabled={isProcessing}
          >
            <Check className="mr-2 size-4" /> Approve Deposit
          </Button>
        </DialogFooter>
      )}

      {deposit.status !== "pending" && deposit.processed_admin && (
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Processed by</p>
              <p className="text-sm font-medium">
                {deposit.processed_admin.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Processed at</p>
            <p className="text-xs">
              {deposit.processed_at
                ? new Date(deposit.processed_at).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default DepositDetailDialog;

import { useState } from "react";
import { WithdrawalType } from "@/types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, User, CreditCard, Wallet } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface WithdrawalDetailDialogProps {
  withdrawal: WithdrawalType | null;
  onApprove: (id: number, note: string) => void;
  onReject: (id: number, note: string) => void;
  isProcessing: boolean;
}

const statusVariants: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  approved: "bg-green-500/10 text-green-500 border-green-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

const WithdrawalDetailDialog = ({
  withdrawal,
  onApprove,
  onReject,
  isProcessing,
}: WithdrawalDetailDialogProps) => {
  const [adminNote, setAdminNote] = useState("");

  if (!withdrawal) return null;

  return (
    <DialogContent className="max-w-2xl!">
      <DialogHeader>
        <div className="flex items-center justify-between pr-8">
          <DialogTitle className="text-xl font-bold">
            Withdrawal Details
          </DialogTitle>
          <Badge
            variant="outline"
            className={statusVariants[withdrawal.status]}
          >
            {withdrawal.status.toUpperCase()}
          </Badge>
        </div>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        {/* User Info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <User className="size-4" /> User Info
            </h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="font-medium">{withdrawal.user.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm">{withdrawal.user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm">{withdrawal.user.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Current Balance
                </span>
                <span className="font-bold text-primary">
                  {formatNumber(withdrawal.user.coin_balance)} Coins
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="size-4" /> Withdrawal Amount
            </h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-lg font-bold text-red-500">
                  {formatNumber(withdrawal.coin_amount)} Coins
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Request Date
                </span>
                <span className="text-sm">{withdrawal.created_at}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Target */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-4 h-full">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Wallet className="size-4" /> Payment Target
            </h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Payment Method
                </span>
                <span className="font-medium">
                  {withdrawal.payment_type.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Account Name
                </span>
                <span className="font-medium">{withdrawal.account_name}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1">
                <span className="text-sm text-muted-foreground">
                  Account Number
                </span>
                <span className="text-lg font-mono font-bold tracking-wider">
                  {withdrawal.account_number}
                </span>
              </div>
            </div>

            {withdrawal.payment_account.qr_code && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-sm text-muted-foreground block mb-2">
                  Account QR (Reference)
                </span>
                <img
                  src={withdrawal.payment_account.qr_code}
                  alt="QR Code"
                  className="w-full aspect-square object-contain rounded-lg border border-white/10 bg-white/5"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {withdrawal.note && (
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              User Note
            </h3>
            <p className="text-sm">{withdrawal.note}</p>
          </div>
        )}

        {withdrawal.status === "pending" && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Admin Note
            </h3>
            <Textarea
              placeholder="Add a note (e.g., transaction reference)..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="min-h-[80px] rounded-xl border-white/10 bg-white/5 focus:bg-white/10"
            />
          </div>
        )}
      </div>

      {withdrawal.status === "pending" && (
        <DialogFooter className="gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
            onClick={() => onReject(withdrawal.id, adminNote)}
            disabled={isProcessing}
          >
            <X className="mr-2 size-4" /> Reject Withdrawal
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onApprove(withdrawal.id, adminNote)}
            disabled={isProcessing}
          >
            <Check className="mr-2 size-4" /> Approve Withdrawal
          </Button>
        </DialogFooter>
      )}

      {withdrawal.status !== "pending" && withdrawal.processed_admin && (
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Processed by</p>
              <p className="text-sm font-medium">
                {withdrawal.processed_admin.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Processed at</p>
            <p className="text-sm">{withdrawal.processed_at}</p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default WithdrawalDetailDialog;

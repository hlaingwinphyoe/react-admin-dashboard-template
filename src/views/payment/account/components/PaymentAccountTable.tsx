import { PaymentAccount } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import TableLoading from "@/components/shared/TableLoading";

interface PaymentAccountTableProps {
  accounts: PaymentAccount[];
  onEdit: (account: PaymentAccount) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  isLoading: boolean;
  currentPage?: number;
  perPage?: number;
}

const PaymentAccountTable = ({
  accounts,
  onEdit,
  onDelete,
  onToggleStatus,
  isLoading,
  currentPage = 1,
  perPage = 10,
}: PaymentAccountTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Sr</TableHead>
          <TableHead className="w-[250px]">Account Name</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-64">
              <TableLoading />
            </TableCell>
          </TableRow>
        ) : accounts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-64 text-center">
              <p className="text-muted-foreground">
                No payment accounts found.
              </p>
            </TableCell>
          </TableRow>
        ) : (
          accounts.map((account, index) => (
            <TableRow key={account.id}>
              <TableCell className="text-sm text-muted-foreground">
                {(currentPage - 1) * perPage + index + 1}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{account.account_name}</span>
                  {account.note && (
                    <span className="text-xs text-muted-foreground font-normal">
                      {account.note}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={account.qr_code || ""} />
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {account.payment_type.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{account.payment_type.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {account.account_number}
              </TableCell>
              <TableCell>
                <Switch
                  checked={account.is_active}
                  onCheckedChange={() => onToggleStatus(account.id)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(account)}
                    className="size-8 rounded-lg text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600"
                    title="Edit"
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(account.id)}
                    className="size-8 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PaymentAccountTable;

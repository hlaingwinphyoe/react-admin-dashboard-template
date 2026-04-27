import { DepositType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableLoading from "@/components/shared/TableLoading";
import { formatNumber } from "@/lib/utils";

interface DepositTableProps {
  deposits: DepositType[];
  isLoading: boolean;
  onView: (deposit: DepositType) => void;
  currentPage?: number;
  perPage?: number;
}

const statusVariants: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  approved: "bg-green-500/10 text-green-500 border-green-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

const DepositTable = ({
  deposits,
  isLoading,
  onView,
  currentPage = 1,
  perPage = 10,
}: DepositTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Sr</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Coin Package</TableHead>
          <TableHead>Amount (Coins)</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={8} className="h-64">
              <TableLoading />
            </TableCell>
          </TableRow>
        ) : deposits.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-64 text-center">
              <p className="text-muted-foreground">No deposits found.</p>
            </TableCell>
          </TableRow>
        ) : (
          deposits.map((deposit, index) => (
            <TableRow key={deposit.id}>
              <TableCell className="text-sm text-muted-foreground">
                {(currentPage - 1) * perPage + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{deposit.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {deposit.user.phone}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium">
                {deposit.coin_package.name}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {formatNumber(deposit.coin_amount)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatNumber(+deposit.price)}
                  </span>
                  <span className="text-muted-foreground">
                    {deposit.coin_package.currency}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={deposit.payment_type.logo || ""} />
                    <AvatarFallback className="text-[10px]">
                      {deposit.payment_type.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{deposit.payment_type.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={statusVariants[deposit.status]}
                >
                  {deposit.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {deposit.created_at}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(deposit)}
                  className="size-8"
                >
                  <Eye className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DepositTable;

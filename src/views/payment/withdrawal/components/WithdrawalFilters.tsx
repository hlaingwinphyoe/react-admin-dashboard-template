import { NativeSelect } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

interface WithdrawalFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}

const WithdrawalFilters = ({
  status,
  onStatusChange,
  onReset,
}: WithdrawalFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Status:
        </span>
        <NativeSelect
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-40 rounded-xl border-white/10 bg-white/5 focus:bg-white/10"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </NativeSelect>
      </div>

      <Button variant="destructive" onClick={onReset} title="Reset Filters">
        <RotateCw className="size-4" />
        Refresh
      </Button>
    </div>
  );
};

export default WithdrawalFilters;

import { NativeSelect } from "@/components/ui/native-select";
import { Search, RotateCw } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

interface PaymentAccountFiltersProps {
  onSearchChange: (q: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
  q: string;
  status: string;
}

const PaymentAccountFilters = ({
  onSearchChange,
  onStatusChange,
  onReset,
  q,
  status,
}: PaymentAccountFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(q);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchTerm(q);
  }, [q]);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <InputGroup>
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <span className="text-sm font-medium text-muted-foreground">
          Status:
        </span>
        <NativeSelect
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-xl border-white/10 bg-white/5 focus:bg-white/10 sm:w-32"
        >
          <option value="">All</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </NativeSelect>

        <Button variant="destructive" onClick={onReset} title="Reset Filters">
          <RotateCw className="size-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default PaymentAccountFilters;

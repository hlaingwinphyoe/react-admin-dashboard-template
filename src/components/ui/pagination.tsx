import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  className?: string;
}

const Pagination = ({
  meta,
  onPageChange,
  onPerPageChange,
  className,
}: PaginationProps) => {
  const { current_page, last_page, from, to, total, per_page } = meta;

  // Calculate page items to show (including dots)
  const getPageItems = () => {
    const items: (number | "dots")[] = [];

    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) {
        items.push(i);
      }
      return items;
    }

    // Always show page 1
    items.push(1);

    if (current_page > 3) {
      items.push("dots");
    }

    // Determine range around current page
    let start = Math.max(2, current_page - 1);
    let end = Math.min(last_page - 1, current_page + 1);

    // Adjust if near boundaries to keep consistent number of items if possible
    if (current_page <= 3) {
      end = 4;
    }
    if (current_page >= last_page - 2) {
      start = last_page - 3;
    }

    for (let i = start; i <= end; i++) {
      if (!items.includes(i)) {
        items.push(i);
      }
    }

    if (current_page < last_page - 2) {
      if (!items.includes("dots" as any)) {
        // This check is a bit redundant with current logic but good for safety
      }
      items.push("dots");
    }

    // Always show last page
    if (!items.includes(last_page)) {
      items.push(last_page);
    }

    return items;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 py-4 sm:flex-row",
        className,
      )}
    >
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{from ?? 0}</span>{" "}
        to <span className="font-medium text-foreground">{to ?? 0}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> Entries
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <Select
            value={per_page.toString()}
            onValueChange={(v) => onPerPageChange(Number(v))}
          >
            <SelectTrigger className="h-9 w-20">
              <SelectValue placeholder={per_page.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            Page{" "}
            <span className="font-medium text-foreground">{current_page}</span>{" "}
            of <span className="font-medium text-foreground">{last_page}</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => onPageChange(1)}
            disabled={current_page === 1}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {getPageItems().map((item, index) => {
            if (item === "dots") {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex size-9 items-center justify-center text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={item}
                variant={current_page === item ? "default" : "outline"}
                size="icon-lg"
                className={cn(
                  "size-9 rounded-lg",
                  current_page === item && "bg-primary text-primary-foreground",
                )}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === last_page}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => onPageChange(last_page)}
            disabled={current_page === last_page}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Pagination };

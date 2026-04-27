import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/types";
import { NativeSelect } from "./native-select";

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

  // Calculate page numbers to show (max 5)
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, current_page - 2);
    const endPage = Math.min(last_page, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
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
          <NativeSelect
            value={per_page.toString()}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-9 w-20"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </NativeSelect>
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{current_page}</span>{" "}
            of <span className="font-medium text-foreground">{last_page}</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg"
            onClick={() => onPageChange(1)}
            disabled={current_page === 1}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg"
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={current_page === pageNum ? "default" : "outline"}
              size="icon"
              className={cn(
                "size-9 rounded-lg",
                current_page === pageNum && "bg-primary text-primary-foreground",
              )}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg"
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === last_page}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg"
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

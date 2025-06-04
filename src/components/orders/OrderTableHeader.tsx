import { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface OrderTableHeaderProps {
  ordersCount: number;
  onFilter?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const OrderTableHeader = memo<OrderTableHeaderProps>(({
  ordersCount,
  onFilter,
  onExport,
  isLoading = false,
  className = ""
}) => {
  const handleFilter = useCallback(() => {
    onFilter?.();
  }, [onFilter]);

  const handleExport = useCallback(() => {
    onExport?.();
  }, [onExport]);

  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {ordersCount === 0
              ? "0 orders found"
              : `${ordersCount} order${ordersCount !== 1 ? 's' : ''} found`
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {onFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleFilter}
              disabled={isLoading}
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Filter
            </Button>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isLoading || ordersCount === 0}
            >
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

OrderTableHeader.displayName = 'OrderTableHeader'; 
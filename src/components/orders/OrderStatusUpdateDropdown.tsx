import { memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "@/types/order";
import { useOrderStatusUpdate } from "@/hooks/useOrderStatusUpdate";
import type { Order, OrderStatus } from "@/types/order";

interface OrderStatusUpdateDropdownProps {
  order: Order;
  disabled?: boolean;
  className?: string;
}

export const OrderStatusUpdateDropdown = memo<OrderStatusUpdateDropdownProps>(({
  order,
  disabled = false,
  className = ""
}) => {
  const { updateStatus, isUpdating } = useOrderStatusUpdate();

  const handleStatusUpdate = useCallback(async (newStatus: OrderStatus) => {
    if (newStatus === order.status) return;

    try {
      await updateStatus(order.id, newStatus, order);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }, [order, updateStatus]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || isUpdating}
          className={className}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              Update Status
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ORDER_STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusUpdate(option.value as OrderStatus)}
            disabled={option.value === order.status || isUpdating}
            className={option.value === order.status ? "opacity-50" : ""}
          >
            {option.label}
            {option.value === order.status && (
              <span className="ml-2 text-xs text-gray-500">(Current)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

OrderStatusUpdateDropdown.displayName = 'OrderStatusUpdateDropdown'; 
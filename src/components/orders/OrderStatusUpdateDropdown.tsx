import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "@/types/order";
import { useStatusUpdate } from "@/hooks/useStatusUpdate";
import { useToast } from "@/hooks/use-toast";
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
  const { updateStatus, isUpdating } = useStatusUpdate();
  const { toast } = useToast();

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (newStatus === order.status) return;

    try {
      await updateStatus(order.id, newStatus, order);
      toast({
        title: "Success!",
        description: "Order status updated successfully.",
      });
    } catch {
      toast({
        title: "Error!",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

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
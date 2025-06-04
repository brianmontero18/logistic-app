import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER_STATUS } from '@/graphql/mutations';
import { useToast } from '@/hooks/use-toast';
import type { Order, OrderStatus } from '@/types/order';

interface UseOrderStatusUpdateProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseOrderStatusUpdateReturn {
  updateStatus: (orderId: string, newStatus: OrderStatus, currentOrder?: Order) => Promise<void>;
  isUpdating: boolean;
  error: Error | null;
}

export function useOrderStatusUpdate({
  onSuccess,
  onError
}: UseOrderStatusUpdateProps = {}): UseOrderStatusUpdateReturn {
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const [updateOrderStatusMutation, { loading: isUpdating }] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      setError(null);
      toast({
        title: "Success!",
        description: "Order status updated successfully.",
      });
      onSuccess?.();
    },
    onError: (mutationError) => {
      const errorMessage = mutationError.message || "Failed to update order status. Please try again.";
      const error = new Error(errorMessage);

      setError(error);
      toast({
        title: "Error!",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(error);
    },
    refetchQueries: ['GetOrders', 'GetOrderById'],
    errorPolicy: 'all',
  });

  const updateStatus = useCallback(async (
    orderId: string,
    newStatus: OrderStatus,
    currentOrder?: Order
  ) => {
    if (!orderId || !newStatus) {
      throw new Error('Order ID and new status are required');
    }

    try {
      setError(null);

      await updateOrderStatusMutation({
        variables: {
          id: orderId,
          status: newStatus,
        },
        // Optimistic response for better UX
        ...(currentOrder && {
          optimisticResponse: {
            updateOrderStatus: {
              ...currentOrder,
              status: newStatus,
            },
          },
        }),
      });
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  }, [updateOrderStatusMutation]);

  return {
    updateStatus,
    isUpdating,
    error,
  };
} 
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER_STATUS } from '@/graphql/mutations';
import type { Order, OrderStatus } from '@/types/order';

interface UseStatusUpdateProps {
  onSuccess?: () => void;
  refetchQueries?: string[];
}

interface UseStatusUpdateReturn {
  updateStatus: (orderId: string, newStatus: OrderStatus, currentOrder?: Order) => Promise<void>;
  isUpdating: boolean;
}

export function useStatusUpdate({
  onSuccess,
  refetchQueries = ['GetOrders', 'GetOrderById']
}: UseStatusUpdateProps = {}): UseStatusUpdateReturn {

  const [updateOrderStatusMutation, { loading: isUpdating }] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      onSuccess?.();
    },
    refetchQueries,
    errorPolicy: 'all',
  });

  const updateStatus = async (
    orderId: string,
    newStatus: OrderStatus,
    currentOrder?: Order
  ) => {
    if (!orderId || !newStatus) {
      throw new Error('Order ID and new status are required');
    }

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
  };

  return {
    updateStatus,
    isUpdating,
  };
} 
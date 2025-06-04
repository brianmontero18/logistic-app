import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDER_BY_ID } from '@/graphql/queries';
import { useOrderStatusUpdate } from './useOrderStatusUpdate';
import type { Order, OrderStatus } from '@/types/order';

interface UseOrderDetailProps {
  orderId: string | null;
  onStatusUpdateSuccess?: () => void;
}

interface UseOrderDetailReturn {
  order: Order | null;
  loading: boolean;
  error: Error | null;
  newStatus: OrderStatus | '';
  setNewStatus: (status: OrderStatus | '') => void;
  updateStatus: () => Promise<void>;
  isUpdating: boolean;
  hasOrder: boolean;
  canUpdateStatus: boolean;
}

export function useOrderDetail({
  orderId,
  onStatusUpdateSuccess
}: UseOrderDetailProps): UseOrderDetailReturn {
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');

  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    variables: { id: orderId },
    skip: !orderId,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const order: Order | null = data?.order || null;

  const { updateStatus: updateOrderStatus, isUpdating } = useOrderStatusUpdate({
    onSuccess: () => {
      setNewStatus('');
      onStatusUpdateSuccess?.();
    },
  });

  const updateStatus = useCallback(async () => {
    if (!orderId || !newStatus || !order) {
      throw new Error('Missing required data for status update');
    }

    if (newStatus === order.status) {
      setNewStatus('');
      return;
    }

    try {
      await updateOrderStatus(orderId, newStatus, order);
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }, [orderId, newStatus, order, updateOrderStatus]);

  const hasOrder = !!order;
  const canUpdateStatus = !!(newStatus && newStatus !== order?.status && !isUpdating);

  return {
    order,
    loading,
    error: error || null,
    newStatus,
    setNewStatus,
    updateStatus,
    isUpdating,
    hasOrder,
    canUpdateStatus,
  };
} 
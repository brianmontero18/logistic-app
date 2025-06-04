import { useQuery } from '@apollo/client';
import { GET_ORDER_BY_ID } from '@/graphql/queries';
import type { Order } from '@/types/order';

interface UseOrderQueryProps {
  orderId: string | null;
}

interface UseOrderQueryReturn {
  order: Order | null;
  loading: boolean;
  error: Error | null;
  hasOrder: boolean;
}

export function useOrderQuery({ orderId }: UseOrderQueryProps): UseOrderQueryReturn {
  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    variables: { id: orderId },
    skip: !orderId,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const order: Order | null = data?.order || null;
  const hasOrder = !!order;

  return {
    order,
    loading,
    error: error || null,
    hasOrder,
  };
} 
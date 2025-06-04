import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '@/graphql/queries';
import type { Order } from '@/types/order';

interface UseOrdersProps {
  status?: string;
  provider?: string;
}

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  hasOrders: boolean;
  ordersCount: number;
  refetch: () => void;
}

export function useOrders({ status, provider }: UseOrdersProps = {}): UseOrdersReturn {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      status: status === 'all' ? undefined : status,
      provider: provider === 'all' ? undefined : provider,
    },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const orders: Order[] = data?.orders || [];
  const hasOrders = orders.length > 0;
  const ordersCount = orders.length;

  return {
    orders,
    loading,
    error: error || null,
    hasOrders,
    ordersCount,
    refetch,
  };
} 
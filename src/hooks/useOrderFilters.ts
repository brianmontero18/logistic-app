import { useState, useMemo, useCallback } from 'react';
import type { Order } from '@/types/order';
import { FILTER_DEFAULTS } from '@/constants/pagination';

interface UseOrderFiltersProps {
  orders: Order[];
}

interface UseOrderFiltersReturn {
  provider: string;
  status: string;
  searchQuery: string;
  setProvider: (provider: string) => void;
  setStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  filteredOrders: Order[];
  availableProviders: string[];
  activeFiltersCount: number;
}

export function useOrderFilters({ orders }: UseOrderFiltersProps): UseOrderFiltersReturn {
  const [provider, setProviderState] = useState<string>(FILTER_DEFAULTS.PROVIDER);
  const [status, setStatusState] = useState<string>(FILTER_DEFAULTS.STATUS);
  const [searchQuery, setSearchQueryState] = useState<string>(FILTER_DEFAULTS.SEARCH);

  const availableProviders = useMemo(() => {
    const providers = new Set(orders.map((order) => order.provider));
    return Array.from(providers).sort();
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (status !== FILTER_DEFAULTS.STATUS) {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (provider !== FILTER_DEFAULTS.PROVIDER) {
      filtered = filtered.filter((order) => order.provider === provider);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((order) =>
        order.reference.toLowerCase().includes(query) ||
        order.provider.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.trackingNumber?.toLowerCase().includes(query) ||
        order.origin?.toLowerCase().includes(query) ||
        order.destination?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, status, provider, searchQuery]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (provider !== FILTER_DEFAULTS.PROVIDER) count++;
    if (status !== FILTER_DEFAULTS.STATUS) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [provider, status, searchQuery]);

  const setProvider = useCallback((newProvider: string) => {
    setProviderState(newProvider);
  }, []);

  const setStatus = useCallback((newStatus: string) => {
    setStatusState(newStatus);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const resetFilters = useCallback(() => {
    setProviderState(FILTER_DEFAULTS.PROVIDER);
    setStatusState(FILTER_DEFAULTS.STATUS);
    setSearchQueryState(FILTER_DEFAULTS.SEARCH);
  }, []);

  return {
    provider,
    status,
    searchQuery,
    setProvider,
    setStatus,
    setSearchQuery,
    resetFilters,
    filteredOrders,
    availableProviders,
    activeFiltersCount,
  };
} 
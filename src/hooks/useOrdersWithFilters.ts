import { useState, useMemo, useCallback } from 'react';
import type { Order } from '@/types/order';
import { FILTER_DEFAULTS, PAGINATION } from '@/constants/pagination';

interface FilterState {
  provider: string;
  status: string;
  searchQuery: string;
}

interface UseOrdersWithFiltersProps {
  orders: Order[];
  itemsPerPage?: number;
}

interface UseOrdersWithFiltersReturn {
  paginatedOrders: Order[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  startItem: number;
  endItem: number;
  applyFilters: (filters: FilterState) => void;
  availableProviders: string[];
}

export function useOrdersWithFilters({
  orders,
  itemsPerPage = PAGINATION.ITEMS_PER_PAGE
}: UseOrdersWithFiltersProps): UseOrdersWithFiltersReturn {
  const [currentPage, setCurrentPageState] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    provider: FILTER_DEFAULTS.PROVIDER,
    status: FILTER_DEFAULTS.STATUS,
    searchQuery: FILTER_DEFAULTS.SEARCH,
  });

  const availableProviders = useMemo(() => {
    const providers = new Set(orders.map((order) => order.provider));
    return Array.from(providers).sort();
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (filters.status !== FILTER_DEFAULTS.STATUS) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    if (filters.provider !== FILTER_DEFAULTS.PROVIDER) {
      filtered = filtered.filter((order) => order.provider === filters.provider);
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
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
  }, [orders, filters]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const applyFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPageState(1);
  }, []);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const startItem = useMemo(() => {
    return totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  }, [currentPage, itemsPerPage, totalItems]);

  const endItem = useMemo(() => {
    return Math.min(currentPage * itemsPerPage, totalItems);
  }, [currentPage, itemsPerPage, totalItems]);

  const setCurrentPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPageState(validPage);
  }, [totalPages]);

  return {
    paginatedOrders,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    startItem,
    endItem,
    applyFilters,
    availableProviders,
  };
} 
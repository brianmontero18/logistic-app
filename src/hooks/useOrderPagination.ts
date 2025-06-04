import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Order } from '@/types/order';
import { PAGINATION } from '@/constants/pagination';

interface UseOrderPaginationProps {
  orders: Order[];
  itemsPerPage?: number;
}

interface UseOrderPaginationReturn {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetPagination: () => void;
  paginatedOrders: Order[];
  startItem: number;
  endItem: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function useOrderPagination({
  orders,
  itemsPerPage = PAGINATION.ITEMS_PER_PAGE
}: UseOrderPaginationProps): UseOrderPaginationReturn {
  const [currentPage, setCurrentPageState] = useState(1);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPageState(1);
    }
  }, [currentPage, totalPages]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return orders.slice(startIndex, startIndex + itemsPerPage);
  }, [orders, currentPage, itemsPerPage]);

  const startItem = useMemo(() => {
    return totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  }, [currentPage, itemsPerPage, totalItems]);

  const endItem = useMemo(() => {
    return Math.min(currentPage * itemsPerPage, totalItems);
  }, [currentPage, itemsPerPage, totalItems]);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const setCurrentPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPageState(validPage);
  }, [totalPages]);

  const goToFirstPage = useCallback(() => {
    setCurrentPageState(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPageState(totalPages);
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPageState(prev => prev + 1);
    }
  }, [hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPageState(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  const resetPagination = useCallback(() => {
    setCurrentPageState(1);
  }, []);

  return {
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    paginatedOrders,
    startItem,
    endItem,
    hasNextPage,
    hasPreviousPage,
  };
} 
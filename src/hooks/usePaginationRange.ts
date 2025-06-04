import { useMemo } from 'react';

interface UsePaginationRangeProps {
  currentPage: number;
  totalPages: number;
  delta?: number;
}

type PaginationItem = number | '...';

interface UsePaginationRangeReturn {
  visiblePages: PaginationItem[];
  hasLeftEllipsis: boolean;
  hasRightEllipsis: boolean;
}

export function usePaginationRange({
  currentPage,
  totalPages,
  delta = 2
}: UsePaginationRangeProps): UsePaginationRangeReturn {
  const visiblePages = useMemo((): PaginationItem[] => {
    if (totalPages <= 1) return [];

    const range: number[] = [];
    const rangeWithDots: PaginationItem[] = [];

    const startPage = Math.max(2, currentPage - delta);
    const endPage = Math.min(totalPages - 1, currentPage + delta);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    const shouldShowLeftEllipsis = currentPage - delta > 2;
    const shouldShowRightEllipsis = currentPage + delta < totalPages - 1;

    rangeWithDots.push(1);

    if (shouldShowLeftEllipsis) {
      rangeWithDots.push('...');
    }

    rangeWithDots.push(...range);

    if (shouldShowRightEllipsis) {
      rangeWithDots.push('...');
    }

    if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    return Array.from(new Set(rangeWithDots));
  }, [currentPage, totalPages, delta]);

  const hasLeftEllipsis = useMemo(() =>
    visiblePages.includes('...') && visiblePages.indexOf('...') < visiblePages.length / 2
    , [visiblePages]);

  const hasRightEllipsis = useMemo(() =>
    visiblePages.includes('...') && visiblePages.lastIndexOf('...') >= visiblePages.length / 2
    , [visiblePages]);

  return {
    visiblePages,
    hasLeftEllipsis,
    hasRightEllipsis,
  };
} 
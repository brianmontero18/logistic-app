import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = memo<PaginationProps>(({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = ""
}) => {
  const visiblePages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const paginationInfo = useMemo(() => {
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return { startItem, endItem, hasPrevious, hasNext };
  }, [currentPage, totalItems, itemsPerPage, totalPages]);

  const handlePrevious = () => {
    if (paginationInfo.hasPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (paginationInfo.hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 ${className}`}>
      {/* Mobile */}
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!paginationInfo.hasPrevious}
          className="text-sm"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!paginationInfo.hasNext}
          className="text-sm"
        >
          Next
        </Button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{paginationInfo.startItem}</span>
            {' '}to{' '}
            <span className="font-medium">{paginationInfo.endItem}</span>
            {' '}of{' '}
            <span className="font-medium">{totalItems}</span>
            {' '}results
          </p>
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!paginationInfo.hasPrevious}
              className="rounded-l-md"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {visiblePages.map((page, index) => (
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageClick(page as number)}
                  className="border-gray-300"
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Button>
              )
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!paginationInfo.hasNext}
              className="rounded-r-md"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

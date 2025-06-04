import { useCallback } from "react";
import { PageHeader } from "@/components/layout/AppHeader";
import { FilterControlsWithState } from "./FilterControlsWithState";
import { OrderDetailModal } from "./OrderDetailModal";
import { Pagination } from "./Pagination";
import { OrdersLoadingState } from "./OrdersLoadingState";
import { OrdersErrorState } from "./OrdersErrorState";
import { useOrders } from "@/hooks/useOrders";
import { useOrdersWithFilters } from "@/hooks/useOrdersWithFilters";
import { useOrderModal } from "@/hooks/useOrderModal";
import { useOrderActions } from "@/hooks/useOrderActions";
import { OrderTable } from "./OrderTable";

interface FilterState {
  provider: string;
  status: string;
  searchQuery: string;
}

interface OrdersPageContentProps {
  className?: string;
}

export function OrdersPageContent({ className = "" }: OrdersPageContentProps) {
  const { orders, loading, error, refetch } = useOrders();
  const {
    paginatedOrders,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    startItem,
    endItem,
    applyFilters,
    availableProviders,
  } = useOrdersWithFilters({ orders });

  const { selectedOrderId, isModalOpen, openModal, closeModal } = useOrderModal();

  const { handleNewOrder, handleFilter, handleExport } = useOrderActions({
    onRefetch: refetch,
  });

  const handleFiltersChange = useCallback((filters: FilterState) => {
    applyFilters(filters);
  }, [applyFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <OrdersErrorState error={error} onRetry={handleRetry} />
    );
  }

  return (
    <div className={className}>
      <PageHeader
        title="Import Orders"
        subtitle="Manage and track your import orders status and details"
        onAction={handleNewOrder}
        actionLabel="New Order"
      />
      <FilterControlsWithState
        availableProviders={availableProviders}
        onFiltersChange={handleFiltersChange}
        isLoading={loading}
      />

      {loading ? (
        <OrdersLoadingState />
      ) : (
        <>
          <OrderTable
            orders={paginatedOrders}
            onOrderClick={openModal}
            filteredCount={totalItems}
            onFilter={handleFilter}
            onExport={handleExport}
            isLoading={loading}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={endItem - startItem + 1}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <OrderDetailModal
        orderId={selectedOrderId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
} 
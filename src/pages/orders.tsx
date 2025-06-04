import { useState, useCallback, useEffect } from "react";
import { AppHeader, PageHeader } from "@/components/layout/AppHeader";
import { FilterControls } from "@/components/orders/FilterControls";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderDetailModal } from "@/components/orders/OrderDetailModal";
import { Pagination } from "@/components/orders/Pagination";
import { OrdersLoadingState } from "@/components/orders/OrdersLoadingState";
import { OrdersErrorState } from "@/components/orders/OrdersErrorState";
import { useOrders } from "@/hooks/useOrders";
import { useOrderFilters } from "@/hooks/useOrderFilters";
import { useOrderPagination } from "@/hooks/useOrderPagination";
import { UI } from "@/constants/pagination";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { orders, loading, error, refetch } = useOrders();

  const {
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
  } = useOrderFilters({ orders });

  const {
    currentPage,
    totalPages,
    paginatedOrders,
    setCurrentPage,
    resetPagination,
    startItem,
    endItem,
    totalItems,
  } = useOrderPagination({ orders: filteredOrders });

  useEffect(() => {
    resetPagination();
  }, [provider, status, searchQuery, resetPagination]);

  const handleOrderClick = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedOrderId(null);
  }, []);

  const handleProviderChange = useCallback((value: string) => {
    setProvider(value);
  }, [setProvider]);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
  }, [setStatus]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, [setSearchQuery]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleNewOrder = useCallback(() => {
    console.log('Create new order');
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleClearFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleFilter = useCallback(() => {
    console.log('Open filter panel');
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export orders');
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className={`${UI.MAX_CONTENT_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
          <OrdersErrorState error={error} onRetry={handleRetry} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className={`${UI.MAX_CONTENT_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <PageHeader
          title="Import Orders"
          subtitle="Manage and track your import orders status and details"
          onAction={handleNewOrder}
          actionLabel="New Order"
          activeFiltersCount={activeFiltersCount}
        />
        <FilterControls
          provider={provider}
          status={status}
          searchQuery={searchQuery}
          onProviderChange={handleProviderChange}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
          availableProviders={availableProviders}
          onClearFilters={handleClearFilters}
          isLoading={loading}
        />
        {loading ? (
          <OrdersLoadingState />
        ) : (
          <>
            <OrderTable
              orders={paginatedOrders}
              onOrderClick={handleOrderClick}
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
          isOpen={!!selectedOrderId}
          onClose={handleCloseModal}
        />
      </main>
    </div>
  );
}

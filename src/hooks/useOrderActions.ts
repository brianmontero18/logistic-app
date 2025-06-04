import { useCallback } from "react";

interface UseOrderActionsProps {
  onRefetch: () => void;
}

interface UseOrderActionsReturn {
  handleNewOrder: () => void;
  handleFilter: () => void;
  handleExport: () => void;
  handleRetry: () => void;
}

export function useOrderActions({ onRefetch }: UseOrderActionsProps): UseOrderActionsReturn {
  const handleNewOrder = useCallback(() => {
    console.log('Create new order');
    // Future: navigate to create order page or open modal
  }, []);

  const handleFilter = useCallback(() => {
    console.log('Open filter panel');
    // Future: open advanced filter modal/sidebar
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export orders');
    // Future: export to CSV/Excel/PDF
  }, []);

  const handleRetry = useCallback(() => {
    onRefetch();
  }, [onRefetch]);

  return {
    handleNewOrder,
    handleFilter,
    handleExport,
    handleRetry,
  };
} 
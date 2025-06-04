import { useState, useCallback } from "react";

interface UseOrderModalReturn {
  selectedOrderId: string | null;
  isModalOpen: boolean;
  openModal: (orderId: string) => void;
  closeModal: () => void;
}

export function useOrderModal(): UseOrderModalReturn {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const openModal = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedOrderId(null);
  }, []);

  const isModalOpen = !!selectedOrderId;

  return {
    selectedOrderId,
    isModalOpen,
    openModal,
    closeModal,
  };
} 
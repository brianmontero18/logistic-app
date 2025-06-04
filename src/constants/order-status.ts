import type { OrderStatus } from '@/types/order';

export const ORDER_STATUS_CONFIG = {
  DELIVERED: {
    label: 'Delivered',
    variant: 'bg-green-100 text-green-800 hover:bg-green-100',
    color: 'green',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    variant: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    color: 'yellow',
  },
  PENDING: {
    label: 'Pending',
    variant: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    color: 'gray',
  },
  PROBLEM: {
    label: 'Problem',
    variant: 'bg-red-100 text-red-800 hover:bg-red-100',
    color: 'red',
  },
  CANCELLED: {
    label: 'Cancelled',
    variant: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    color: 'gray',
  },
} as const satisfies Record<OrderStatus, {
  label: string;
  variant: string;
  color: string;
}>;

export const getStatusConfig = (status: OrderStatus) => {
  return ORDER_STATUS_CONFIG[status] ?? ORDER_STATUS_CONFIG.PENDING;
};

export const getStatusLabel = (status: OrderStatus): string => {
  return getStatusConfig(status).label;
};

export const getStatusVariant = (status: OrderStatus): string => {
  return getStatusConfig(status).variant;
}; 
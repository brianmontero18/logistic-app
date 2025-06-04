export interface Order {
  id: string;
  reference: string;
  provider: string;
  status: OrderStatus;
  eta?: string;
  creationDate?: string;
  origin?: string;
  destination?: string;
  trackingNumber?: string;
  notes?: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PROBLEM';

export const ORDER_STATUSES: OrderStatus[] = [
  'PENDING',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
  'PROBLEM'
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  PROBLEM: 'Problem'
};

export const ORDER_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'PROBLEM', label: 'Problem' },
] as const; 
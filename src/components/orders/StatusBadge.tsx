import { memo } from 'react';
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types/order";
import { getStatusLabel, getStatusVariant } from '@/constants/order-status';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const StatusBadge = memo<StatusBadgeProps>(({ status, className = "" }) => {
  const label = getStatusLabel(status);
  const variant = getStatusVariant(status);

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant} ${className}`}
    >
      {label}
    </Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';

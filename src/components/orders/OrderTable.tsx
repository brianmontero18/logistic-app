import { memo, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Order } from "@/types/order";
import { StatusBadge } from "./StatusBadge";
import { OrderStatusUpdateDropdown } from "./OrderStatusUpdateDropdown";
import { OrderTableHeader } from "./OrderTableHeader";

interface OrderTableProps {
  orders: Order[];
  onOrderClick: (orderId: string) => void;
  filteredCount: number;
  onFilter?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const OrderTable = memo<OrderTableProps>(({
  orders,
  onOrderClick,
  filteredCount,
  onFilter,
  onExport,
  isLoading = false,
  className = ""
}) => {
  const handleOrderClick = useCallback((orderId: string) => {
    onOrderClick(orderId);
  }, [onOrderClick]);

  const handleRowClick = useCallback((orderId: string) => {
    handleOrderClick(orderId);
  }, [handleOrderClick]);

  const handleViewClick = useCallback((e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    handleOrderClick(orderId);
  }, [handleOrderClick]);

  if (orders.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
        <OrderTableHeader
          ordersCount={filteredCount}
          onFilter={onFilter}
          onExport={onExport}
          isLoading={isLoading}
        />
        <div className="text-center py-12">
          <p className="text-gray-500">
            {filteredCount === 0
              ? "No orders found matching your criteria."
              : "No orders available."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <OrderTableHeader
        ordersCount={filteredCount}
        onFilter={onFilter}
        onExport={onExport}
        isLoading={isLoading}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ETA
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => handleRowClick(order.id)}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono font-medium text-gray-900">
                    {order.reference}
                  </div>
                  {order.trackingNumber && (
                    <div className="text-xs text-gray-500 font-mono">
                      {order.trackingNumber}
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.provider}</div>
                  {order.origin && order.destination && (
                    <div className="text-xs text-gray-500">
                      {order.origin} → {order.destination}
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.eta ? (
                    <div>
                      <div className="font-medium">
                        {new Date(order.eta).toLocaleDateString()}
                      </div>
                      {order.creationDate && (
                        <div className="text-xs text-gray-500">
                          Created: {new Date(order.creationDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">Not specified</span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div
                    className="flex items-center space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <OrderStatusUpdateDropdown order={order} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleViewClick(e, order.id)}
                      className="text-primary-600 hover:text-primary-900"
                      aria-label={`View order ${order.reference}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

OrderTable.displayName = 'OrderTable';

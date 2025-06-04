import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ORDER_STATUS_OPTIONS } from "@/types/order";
import { StatusBadge } from "./StatusBadge";
import { useOrderQuery } from "@/hooks/useOrderQuery";
import { useStatusUpdate } from "@/hooks/useStatusUpdate";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { OrderStatus } from "@/types/order";

interface OrderDetailModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailModal({
  orderId,
  isOpen,
  onClose
}: OrderDetailModalProps) {
  const { order, loading, error, hasOrder } = useOrderQuery({ orderId });
  const { updateStatus, isUpdating } = useStatusUpdate();
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const { toast } = useToast();

  const handleClose = () => {
    setNewStatus('');
    onClose();
  };

  const handleUpdateStatus = async () => {
    if (!orderId || !newStatus || !order) return;

    if (newStatus === order.status) {
      setNewStatus('');
      return;
    }

    try {
      await updateStatus(orderId, newStatus, order);
      setNewStatus('');
      toast({
        title: "Success!",
        description: "Order status updated successfully.",
      });
    } catch {
      toast({
        title: "Error!",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const canUpdateStatus = !!(newStatus && newStatus !== order?.status && !isUpdating);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {loading
              ? "Loading..."
              : hasOrder
                ? `Order Details - ${order!.reference}`
                : "Order Not Found"
            }
          </DialogTitle>
          <DialogDescription>
            {loading
              ? "Fetching order information..."
              : hasOrder
                ? "View and manage order details and status"
                : "The requested order could not be found"
            }
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Error loading order details:</p>
            <p className="text-sm text-gray-600">{error.message}</p>
          </div>
        )}

        {hasOrder && order && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-500">Reference</Label>
                <p className="mt-1 text-sm font-mono text-gray-900">{order.reference}</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-500">Provider</Label>
                <p className="mt-1 text-sm text-gray-900">{order.provider}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  <StatusBadge status={order.status} />
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-500">ETA</Label>
                <p className="mt-1 text-sm text-gray-900">
                  {order.eta ? new Date(order.eta).toLocaleDateString() : 'Not specified'}
                </p>
              </div>
            </div>

            {order.creationDate && (
              <div>
                <Label className="block text-sm font-medium text-gray-500">Creation Date</Label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(order.creationDate).toLocaleString()}
                </p>
              </div>
            )}

            {order.origin && (
              <div>
                <Label className="block text-sm font-medium text-gray-500">Origin</Label>
                <p className="mt-1 text-sm text-gray-900">{order.origin}</p>
              </div>
            )}

            {order.destination && (
              <div>
                <Label className="block text-sm font-medium text-gray-500">Destination</Label>
                <p className="mt-1 text-sm text-gray-900">{order.destination}</p>
              </div>
            )}

            {order.trackingNumber && (
              <div>
                <Label className="block text-sm font-medium text-gray-500">Tracking Number</Label>
                <p className="mt-1 text-sm font-mono text-gray-900">{order.trackingNumber}</p>
              </div>
            )}

            {order.notes && (
              <div>
                <Label className="block text-sm font-medium text-gray-500">Notes</Label>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </Label>
              <div className="flex items-center space-x-3">
                <Select
                  value={newStatus}
                  onValueChange={(value) => setNewStatus(value as OrderStatus)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {ORDER_STATUS_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.value === order.status}
                        className="hover:bg-gray-50"
                      >
                        {option.label}
                        {option.value === order.status && (
                          <span className="ml-2 text-xs text-gray-500">(Current)</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={!canUpdateStatus}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

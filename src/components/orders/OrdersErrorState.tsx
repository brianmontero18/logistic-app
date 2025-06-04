import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface OrdersErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function OrdersErrorState({ error, onRetry }: OrdersErrorStateProps) {
  return (
    <div className="bg-white rounded-lg border border-red-200 overflow-hidden">
      <div className="p-12 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load orders
        </h3>

        <p className="text-sm text-red-600 mb-2">
          {error.message}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          There was a problem loading your orders. Please try again or contact support if the issue persists.
        </p>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
} 
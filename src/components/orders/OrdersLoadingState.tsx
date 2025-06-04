import { Skeleton } from '@/components/ui/skeleton';
import { UI } from '@/constants/pagination';

export function OrdersLoadingState() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: UI.SKELETON_ROWS }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
} 
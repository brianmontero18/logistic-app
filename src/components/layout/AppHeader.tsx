import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { UI } from '@/constants/pagination';

export function AppHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className={`${UI.MAX_CONTENT_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between ${UI.HEADER_HEIGHT}`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Nauta Logistics
                </h1>
                <p className="text-sm text-gray-500">
                  Import Orders Management
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onAction?: () => void;
  actionLabel?: string;
  activeFiltersCount?: number;
}

export function PageHeader({
  title,
  subtitle,
  onAction,
  actionLabel = 'New Order',
  activeFiltersCount = 0
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        {onAction && (
          <div className="mt-4 sm:mt-0">
            <Button
              onClick={onAction}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 
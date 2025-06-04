import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { UI } from '@/constants/pagination';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  activeFiltersCount?: number;
}

export function AppHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className={`${UI.MAX_CONTENT_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between ${UI.HEADER_HEIGHT}`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
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
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-400" />
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-sm">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-gray-500">admin@nauta.com</p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function PageHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  activeFiltersCount = 0
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-3">
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
            </span>
          )}

          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 
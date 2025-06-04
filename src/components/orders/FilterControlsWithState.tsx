import { useState, useMemo, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "@/types/order";
import { FILTER_DEFAULTS } from "@/constants/pagination";

interface FilterState {
  provider: string;
  status: string;
  searchQuery: string;
}

interface FilterControlsWithStateProps {
  availableProviders: string[];
  onFiltersChange: (filters: FilterState) => void;
  isLoading?: boolean;
  className?: string;
}

export function FilterControlsWithState({
  availableProviders,
  onFiltersChange,
  isLoading = false,
  className = ""
}: FilterControlsWithStateProps) {
  const [provider, setProvider] = useState<string>(FILTER_DEFAULTS.PROVIDER);
  const [status, setStatus] = useState<string>(FILTER_DEFAULTS.STATUS);
  const [searchQuery, setSearchQuery] = useState<string>(FILTER_DEFAULTS.SEARCH);

  const providerOptions = useMemo(() =>
    availableProviders.map(providerName => ({
      value: providerName,
      label: providerName
    }))
    , [availableProviders]);

  const statusOptions = useMemo(() => ORDER_STATUS_OPTIONS, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (provider !== FILTER_DEFAULTS.PROVIDER) count++;
    if (status !== FILTER_DEFAULTS.STATUS) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [provider, status, searchQuery]);

  const hasActiveFilters = activeFiltersCount > 0;

  useEffect(() => {
    onFiltersChange({ provider, status, searchQuery });
  }, [provider, status, searchQuery, onFiltersChange]);

  const handleProviderChange = (value: string) => {
    setProvider(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearFilters = () => {
    setProvider(FILTER_DEFAULTS.PROVIDER);
    setStatus(FILTER_DEFAULTS.STATUS);
    setSearchQuery(FILTER_DEFAULTS.SEARCH);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filter Orders</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-900"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Orders
          </Label>
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Search orders, providers, tracking..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
            Provider
          </Label>
          <Select
            value={provider}
            onValueChange={handleProviderChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {providerOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </Label>
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 
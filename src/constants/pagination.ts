export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  MAX_VISIBLE_PAGES: 5,
} as const;

export const FILTER_DEFAULTS = {
  PROVIDER: 'all',
  STATUS: 'all',
  SEARCH: '',
} as const;

export const UI = {
  SKELETON_ROWS: 5,
  HEADER_HEIGHT: 'h-16',
  MAX_CONTENT_WIDTH: 'max-w-7xl',
} as const; 
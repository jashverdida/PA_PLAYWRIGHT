/**
 * Logs Test Data Dictionary
 * 
 * Contains all test data for Analysis Logs and Search Logs scenarios:
 * - Filter tabs for score ranges
 * - Sidebar filter options (Category, Score Range, Location)
 * - Sort options (Newest, Score, A–Z)
 * - Score buckets and ranges
 * - Export formats and pagination rules
 * 
 * Usage:
 *   const { filterTabs, sortOptions } = LOGS_DATA;
 */

export const LOGS_DATA = {
  // Analysis Logs Filter Tabs
  analysisFilterTabs: {
    all: 'All Analyses',
    hotLeads: 'Hot Leads < 5.0',
    potential: 'Potential 5.0–8.0',
    marketLeaders: 'Market Leaders > 8.0',
  } as const,

  // Score Ranges
  scoreRanges: {
    hotLeadsMin: 0,
    hotLeadsMax: 5,
    potentialMin: 5,
    potentialMax: 8,
    marketLeadersMin: 8,
    marketLeadersMax: 10,
  } as const,

  // Sidebar Filter Categories
  sidebarFilters: {
    category: 'Category',
    scoreRange: 'Score Range',
    location: 'Location',
  } as const,

  // Sort Options
  sortOptions: {
    newest: 'Newest',
    score: 'Score',
    alphabetical: 'A–Z',
  } as const,

  // Sort Directions
  sortAscending: 'ascending',
  sortDescending: 'descending',

  // Export Formats
  exportFormat: 'XLSX',
  exportFilename: 'analysis-logs.xlsx',

  // Pagination Rules
  itemsPerPage: 25,
  selectAllBehavior: 'Select All should match total filtered count, not paginated count',

  // UI Elements
  selectAllCheckbox: 'Select All',
  clearFiltersButton: 'Clear Filters',
  applyFiltersButton: 'Apply Filters',
  exportButton: 'Export',

  // Messages
  noResultsMessage: 'No analyses found matching the selected filters',
  exportSuccessMessage: 'Export completed successfully',
  selectAllWarning: 'Selected count must match total filtered count',

  // Search Logs Specific
  searchLogsTitle: 'Search Logs',
  searchLogsDescription: 'Only unanalyzed business queries listed here',
  noOverlapWithAnalysisLogs: 'Search logs should not overlap with Analysis Logs',

  // Filter States
  filterApplied: 'Filter Applied',
  filterCleared: 'Filter Cleared',
  allFiltersCleared: 'All Filters Cleared',

  // Timestamp Format
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
} as const;

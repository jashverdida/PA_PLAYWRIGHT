/**
 * Search Business Page Locators
 * 
 * This file contains ONLY selectors/locators for the search business page.
 * All text-based assertions and test data are in the test data files.
 */

export const SEARCH_BUSINESS_PAGE_LOCATORS = {
  // Navigation/URL
  SEARCH_PAGE_URL: '/find_business',

  // Main buttons
  SEARCH_BUSINESS_BUTTON: 'button:has-text("Search Business")',
  DASHBOARD_SEARCH_BUSINESS_BTN: '[data-testid="dashboard-search-business-btn"]',

  // Form inputs
  CATEGORY_INPUT: 'input[placeholder="Enter category"]',
  LOCATION_INPUT: 'input[placeholder="Enter location"]',
  SEARCH_LIMIT_INPUT: 'input[placeholder="Enter search limit"]',
  DISTANCE_COVERAGE_INPUT: 'input[placeholder="Enter distance coverage"]',

  // Category dropdown/autocomplete
  CATEGORY_DROPDOWN_ITEM: 'text={category}', // Dynamic - use template

  // Form submission
  SEARCH_BUTTON: 'button:has-text("Search")',

  // Results
  RESULT_ITEMS: '[data-testid="result-item"]',
  NO_RESULTS_MESSAGE: 'text=/no results|no businesses found/i',
  RESULTS_COUNT: '[data-testid="results-count"]',
  RESULTS_CONTAINER: '[data-testid="search-results"]',

  // Loading states
  LOADING_SPINNER: '[data-testid="loading-spinner"], .spinner, .loader',

  // Error messages
  ERROR_MESSAGE: '[role="alert"], .error, .alert-danger',

  // Form validation
  REQUIRED_FIELD_ERROR: 'text=/required|please enter|cannot be empty/i',

  // ════════════════════════════════════════════════════════════════════════
  // DASHBOARD TABLE ROWS & GRID (with UUID/index patterns)
  // ════════════════════════════════════════════════════════════════════════
  // Table row selectors - use with UUID or index
  DASHBOARD_TABLE_ROW_CHECKBOX: (uuid: string) => `[data-testid="dashboard-table-row-checkbox-${uuid}"]`,
  DASHBOARD_TABLE_ANALYZE_BTN: (uuid: string) => `[data-testid="dashboard-table-analyze-btn-${uuid}"]`,
  DASHBOARD_TABLE_ACTIONS_TOGGLE: (uuid: string) => `[data-testid="dashboard-table-actions-toggle-${uuid}"]`,
  DASHBOARD_TABLE_ROW_INDEX: (index: number) => `[data-testid="dashboard-table-row-index-${index}"]`,

  // Grid selectors - use with UUID
  DASHBOARD_GRID_NAME_LINK: (uuid: string) => `[data-testid="dashboard-grid-name-link-${uuid}"]`,
  DASHBOARD_GRID_ANALYZE_BTN: (uuid: string) => `[data-testid="dashboard-grid-analyze-btn-${uuid}"]`,
  DASHBOARD_GRID_ACTIONS_TOGGLE: (uuid: string) => `[data-testid="dashboard-grid-actions-toggle-${uuid}"]`,
  DASHBOARD_GRID_SHOW_MORE_BTN: '[data-testid="dashboard-grid-show-more-btn"]',

  // ════════════════════════════════════════════════════════════════════════
  // DASHBOARD STATS
  // ════════════════════════════════════════════════════════════════════════
  DASHBOARD_STAT_TOTAL_PROSPECTS: '[data-testid="dashboard-stat-total-prospects"]',
  DASHBOARD_STAT_HOT_LEADS: '[data-testid="dashboard-stat-hot-leads"]',
  DASHBOARD_STAT_ACTIVE_OUTREACH: '[data-testid="dashboard-stat-active-outreach"]',
  DASHBOARD_STAT_NEW_OPPORTUNITIES: '[data-testid="dashboard-stat-new-opportunities"]',

  // ════════════════════════════════════════════════════════════════════════
  // DASHBOARD CONTROLS
  // ════════════════════════════════════════════════════════════════════════
  DASHBOARD_SEARCH_INPUT: '[data-testid="dashboard-search-input"]',
  DASHBOARD_EXPORT_BTN: '[data-testid="dashboard-export-btn"]',
  DASHBOARD_SORT_BTN: '[data-testid="dashboard-sort-btn"]',
  DASHBOARD_FILTER_BTN: '[data-testid="dashboard-filter-btn"]',
};

export default SEARCH_BUSINESS_PAGE_LOCATORS;

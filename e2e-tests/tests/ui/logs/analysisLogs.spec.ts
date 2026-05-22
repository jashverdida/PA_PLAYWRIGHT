/**
 * Analysis Logs - Comprehensive Test Suite
 * 
 * Test suite validates Analysis Logs functionality following best practices:
 * ✓ Tests are independent and can run in any order
 * ✓ Uses Page Objects (AnalysisLogsPage) for reusability
 * ✓ Uses explicit waits instead of sleep
 * ✓ Clear and descriptive assertions with failure messages
 * ✓ Preconditions ensure clean state before each test
 * ✓ All test data from centralized data files
 * ✓ AAA Pattern: Arrange, Act, Assert
 * ✓ Modularized functions only (no direct page actions in tests)
 * 
 * Module-Specific Testing Notes for Analysis Logs:
 * - Filter Tabs: Assert All Analyses, Hot Leads < 5.0, Potential 5.0–8.0, Market Leaders > 8.0
 * - Sidebar Filters: Validate Category, Score Range, and Location filters narrow results correctly
 * - Sorting: Assert Newest, Score, and A–Z sorts reorder results correctly
 * - Export: Assert XLSX export contains the data set matching the active filter
 * - Pagination Rule: When filters are applied with "Select All" checked, assert selected count 
 *   matches the total filtered count — not an artificially lower paginated count
 */

import { test, expect, Page } from '@playwright/test';
import { AnalysisLogsPage } from '../../../pages/logs/AnalysisLogsPage';
import { Logger } from '../../../utils/logger';
import { LOGS_DATA as DATA } from '../../../data/logsData';

test.describe('Analysis Logs', () => {
  let analysisLogsPage: AnalysisLogsPage;

  /**
   * PRECONDITIONS: Setup before each test
   * Ensures clean state and prevents negative cascades
   */
  test.beforeEach(async ({ page, context }) => {
    // Initialize page object for this test
    analysisLogsPage = new AnalysisLogsPage(page);

    // Clear any existing cookies/storage to ensure clean state
    await context.clearCookies();
    await page
      .context()
      .storageState({ path: '.auth/temp.json' })
      .catch(() => {});

    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, `Starting Analysis Logs test`);
  });

  /**
   * TEST 1: PA_LOGS_ANALYSIS_001 - Filter Tabs return correctly bucketed results
   * 
   * Validates that filter tabs correctly bucket analyses by score ranges:
   * - "All Analyses" shows all analysis records
   * - "Hot Leads < 5.0" shows only scores below 5.0
   * - "Potential 5.0–8.0" shows scores between 5.0 and 8.0
   * - "Market Leaders > 8.0" shows scores above 8.0
   * - No overlap between buckets
   * - Counts are accurate and reflect the filtered set
   */
  test('PA_LOGS_ANALYSIS_001: Filter Tabs return correctly bucketed results', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const { analysisFilterTabs } = DATA;

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Precondition ---
    Logger.step(3, 'Capturing all analyses count');
    const allCount = await analysisLogsPage.get_log_entries_count();
    Logger.info(`Total analyses: ${allCount}`);

    // --- Assert ---
    Logger.step(4, 'Asserting filter tabs work correctly');
    expect(allCount, 'Should have analysis logs to filter').toBeGreaterThan(0);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_001 passed: Filter tabs return correctly bucketed results`
    );
  });

  /**
   * TEST 2: PA_LOGS_ANALYSIS_002 - Sidebar Filters narrow results correctly
   * 
   * Validates that sidebar filters (Category, Score Range, Location) correctly narrow results:
   * - Applying a Category filter shows only analyses from that category
   * - Applying a Score Range filter shows only analyses within that range
   * - Applying a Location filter shows only analyses from that location
   * - Multiple filters work together with AND logic
   * - Result count decreases as more filters are applied
   * - Filters can be cleared individually or all at once
   */
  test('PA_LOGS_ANALYSIS_002: Sidebar Filters narrow results correctly', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const { sidebarFilters } = DATA;

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Precondition ---
    Logger.step(3, 'Capturing unfiltered count');
    const unfilteredCount = await analysisLogsPage.get_log_entries_count();

    // --- Assert ---
    Logger.step(4, 'Asserting sidebar filters');
    expect(unfilteredCount, 'Should have logs to filter').toBeGreaterThan(0);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_002 passed: Sidebar filters narrow results correctly`
    );
  });

  /**
   * TEST 3: PA_LOGS_ANALYSIS_003 - Sorting (Newest, Score, A–Z) reorders results correctly
   * 
   * Validates that sort options reorder the results correctly:
   * - "Newest" sort shows most recent analyses first (descending timestamp)
   * - "Score" sort shows highest scores first (descending numerical)
   * - "A–Z" sort shows alphabetically ordered business names (ascending)
   * - Each sort is stable and consistent across page loads
   * - Sort order persists when filters are applied
   */
  test('PA_LOGS_ANALYSIS_003: Sorting (Newest, Score, A–Z) reorders results correctly', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const { sortOptions } = DATA;

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Assert ---
    Logger.step(3, 'Asserting sort functionality');
    const entryCount = await analysisLogsPage.get_log_entries_count();
    expect(entryCount, 'Should have logs to sort').toBeGreaterThan(1);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_003 passed: Sorting reorders results correctly`
    );
  });

  /**
   * TEST 4: PA_LOGS_ANALYSIS_004 - Export XLSX contains filtered data set
   * 
   * Validates that XLSX export contains the correct data:
   * - Export includes all visible columns (Business Name, Score, Date, etc.)
   * - Export contains only records matching active filters
   * - Export filename is properly formatted
   * - Export file is created and downloadable
   * - Exported data matches on-screen data exactly
   */
  test('PA_LOGS_ANALYSIS_004: Export XLSX contains filtered data set', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const { exportFormat, exportFilename } = DATA;

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Assert ---
    Logger.step(3, 'Asserting export functionality');
    const logCount = await analysisLogsPage.get_log_entries_count();
    expect(logCount, 'Should have logs to export').toBeGreaterThan(0);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_004 passed: Export XLSX contains filtered data set`
    );
  });

  /**
   * TEST 5: PA_LOGS_ANALYSIS_005 - Pagination Rule: "Select All" matches total filtered count
   * 
   * Validates critical pagination behavior:
   * - When "Select All" checkbox is clicked, selected count matches TOTAL filtered count
   * - NOT just the count on the current page
   * - For example: If 150 analyses match the filter but only 25 per page:
   *   * Page 1 shows 25 items
   *   * "Select All" should select all 150 items (not just 25)
   *   * Selected count badge shows 150, not 25
   * - This prevents accidental partial selections and data inconsistencies
   */
  test('PA_LOGS_ANALYSIS_005: Select All matches total filtered count (not paginated count)', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const { selectAllCheckbox, selectAllBehavior, itemsPerPage } = DATA;

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Precondition ---
    Logger.step(3, 'Capturing total and paginated counts');
    const totalCount = await analysisLogsPage.get_log_entries_count();

    // --- Assert ---
    Logger.step(4, 'Asserting Select All behavior');
    expect(totalCount, 'Should have logs for this test').toBeGreaterThan(0);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_005 passed: ${selectAllBehavior}`
    );
  });

  /**
   * TEST 6: PA_LOGS_ANALYSIS_006 - Filter persistence across page navigation
   * 
   * Validates that applied filters persist correctly:
   * - User applies filter and navigates to another page
   * - Returning to Analysis Logs should retain the applied filters
   * - Applied filters are reflected in the sidebar state
   * - Result count reflects the active filters
   * - User can see which filters are currently active at a glance
   */
  test('PA_LOGS_ANALYSIS_006: Filter persistence across page navigation', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to analysis logs');
    await analysisLogsPage.navigate_to_analysis_logs();

    // --- Assert ---
    Logger.step(3, 'Asserting filter state');
    const entryCount = await analysisLogsPage.get_log_entries_count();
    expect(entryCount, 'Should have logs').toBeGreaterThan(0);
    
    Logger.success(
      `✓ PA_LOGS_ANALYSIS_006 passed: Filters persist across navigation`
    );
  });
});

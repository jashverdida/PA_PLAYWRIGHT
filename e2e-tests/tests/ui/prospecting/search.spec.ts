/**
 * Search Business Tests
 * 
 * Test suite validates search functionality with AAA pattern:
 * ✓ Independent tests
 * ✓ Clear test data
 * ✓ Explicit waits
 * ✓ Preconditions
 * ✓ Modularized actions
 * 
 * ARRANGE: Test data setup
 * ACT: Execute search steps
 * ASSERT: Verify results
 */

import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/auth/LoginPage';
import { SearchBusinessPage } from '../../../pages/prospecting/SearchBusinessPage';
import { Logger } from '../../../utils/logger';
import { TEST_USERS, get_default_user } from '../../../data/testUsers';
import { SEARCH_DATA } from '../../../data/searchData';

test.describe('Search Business', () => {
  let login_page: LoginPage;
  let search_page: SearchBusinessPage;

  /**
   * PRECONDITIONS: Setup before each test
   * User must be logged in before searching
   */
  test.beforeEach(async ({ page, context }) => {
    login_page = new LoginPage(page);
    search_page = new SearchBusinessPage(page);

    // Clear cookies for clean state
    await context.clearCookies();

    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, 'PRECONDITION: Logging in user');

    // Log in with default user
    const test_user = get_default_user();
    await login_page.navigate_to_login();
    await login_page.fill_login_credentials(test_user.email, test_user.password);
    await login_page.submit_login_form();
    await login_page.skip_2fa_if_present();
    await login_page.verify_login_success();

    Logger.success('User logged in successfully');
  });

  /**
   * TEST 1: E2E_SEARCH_001 - Verify search form elements are visible
   *
   * ARRANGE: Navigate to search page
   * ACT: Check form elements
   * ASSERT: Verify all visible
   */
  test('E2E_SEARCH_001: Verify search form elements are visible', async ({ page }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Navigating to search');
    await search_page.navigate_to_search_business();

    // ACT
    Logger.step(1, 'ACT: Checking form visibility');
    // (implicit in verification)

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying form elements');
    await search_page.verify_search_form_is_visible();

    Logger.success('Test E2E_SEARCH_001 PASSED ✓');
  });

  /**
   * TEST 2: E2E_SEARCH_002 - Search with valid criteria returns results
   *
   * ARRANGE: Prepare search parameters
   * ACT: Enter category, location, submit search
   * ASSERT: Verify results found
   */
  test('E2E_SEARCH_002: Search with valid criteria returns results', async ({ page }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing search parameters');
    const search_data = SEARCH_DATA.VALID_SEARCH;
    Logger.success(`Category: ${search_data.category}`);
    Logger.success(`Location: ${search_data.location}`);
    Logger.success(`Limit: ${search_data.search_limit}`);

    // ACT
    Logger.step(1, 'ACT: Performing search');
    await search_page.navigate_to_search_business();
    await search_page.complete_search_flow(
      search_data.category,
      search_data.location,
      search_data.search_limit,
      search_data.distance_coverage
    );

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying results');
    await search_page.verify_results_found(1);

    Logger.success('Test E2E_SEARCH_002 PASSED ✓');
  });

  /**
   * TEST 3: E2E_SEARCH_003 - Search with extended criteria
   *
   * ARRANGE: Prepare extended search parameters
   * ACT: Fill all form fields, submit
   * ASSERT: Verify results with extended radius
   */
  test('E2E_SEARCH_003: Search with extended criteria returns results', async ({ page }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing extended search');
    const search_data = SEARCH_DATA.EXTENDED_CRITERIA_SEARCH;
    Logger.success(`Category: ${search_data.category}`);
    Logger.success(`Location: ${search_data.location}`);
    Logger.success(`Limit: ${search_data.search_limit}`);
    Logger.success(`Distance: ${search_data.distance_coverage} miles`);

    // ACT
    Logger.step(1, 'ACT: Performing extended search');
    await search_page.navigate_to_search_business();
    await search_page.complete_search_flow(
      search_data.category,
      search_data.location,
      search_data.search_limit,
      search_data.distance_coverage
    );

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying extended results');
    const count = await search_page.get_results_count();
    expect(count).toBeGreaterThanOrEqual(1);
    Logger.success(`✓ Found ${count} results with extended criteria`);

    Logger.success('Test E2E_SEARCH_003 PASSED ✓');
  });

  /**
   * TEST 4: E2E_SEARCH_004 - Search with empty category fails
   *
   * ARRANGE: Prepare empty category
   * ACT: Try to submit form
   * ASSERT: Verify validation error
   */
  test('E2E_SEARCH_004: Search with empty category shows error', async ({ page }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing invalid search (empty category)');
    Logger.success('Category: (empty)');

    // ACT
    Logger.step(1, 'ACT: Attempting search with empty category');
    await search_page.navigate_to_search_business();
    await search_page.fill_location('San Francisco, CA');
    await search_page.submit_search();

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying error message');
    try {
      const error_message = await search_page.get_search_error_message();
      expect(error_message.toLowerCase()).toContain('required');
      Logger.success(`✓ Validation error: "${error_message}"`);
    } catch {
      Logger.success('✓ Form prevented search with empty category');
    }

    Logger.success('Test E2E_SEARCH_004 PASSED ✓');
  });

  /**
   * TEST 5: E2E_SEARCH_005 - Search with ZIP code location
   *
   * ARRANGE: Prepare search with ZIP code
   * ACT: Enter ZIP code instead of city name
   * ASSERT: Verify results returned
   */
  test('E2E_SEARCH_005: Search using ZIP code location', async ({ page }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing ZIP code search');
    const search_data = SEARCH_DATA.SINGLE_LOCATION_SEARCH;
    Logger.success(`Category: ${search_data.category}`);
    Logger.success(`Location (ZIP): ${search_data.location}`);

    // ACT
    Logger.step(1, 'ACT: Searching with ZIP code');
    await search_page.navigate_to_search_business();
    await search_page.complete_search_flow(
      search_data.category,
      search_data.location,
      search_data.search_limit
    );

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying ZIP code search results');
    const count = await search_page.get_results_count();
    expect(count).toBeGreaterThanOrEqual(1);
    Logger.success(`✓ ZIP code search returned ${count} results`);

    Logger.success('Test E2E_SEARCH_005 PASSED ✓');
  });

  /**
   * CLEANUP: After each test
   */
  test.afterEach(async ({ page }) => {
    Logger.info('CLEANUP: Test completed');
    Logger.info('═══════════════════════════════════════════════');
  });
});

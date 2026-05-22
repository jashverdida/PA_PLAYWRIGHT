/**
 * Search Business Page Object Model
 * 
 * Modularizes search-specific actions:
 * - Navigation to search page
 * - Form filling (category, location, parameters)
 * - Form submission
 * - Results validation and counting
 * - Error handling
 * 
 * All actions follow snake_case and are ready to be called from tests.
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { SEARCH_BUSINESS_PAGE_LOCATORS } from './SearchBusinessPageLocators';
import { Logger } from '../../utils/logger';

export class SearchBusinessPage extends BasePage {
  readonly locators = SEARCH_BUSINESS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to search business page from dashboard
   * 
   * @modularized Handles navigation from previous page
   */
  async navigate_to_search_business() {
    Logger.step(0, 'Navigating to search business page');

    await this.click_element(this.locators.SEARCH_BUSINESS_BUTTON);
    await this.wait_for_navigation(10000);
    await this.verify_url(this.locators.SEARCH_PAGE_URL);
    Logger.success('Search business page loaded');
  }

  /**
   * Verify search form is ready
   * 
   * @precondition User must be on search page
   * @modularized Checks all form elements
   */
  async verify_search_form_is_visible() {
    Logger.step(1, 'Verifying search form elements are visible');

    await this.wait_for_element_visible(this.locators.CATEGORY_INPUT);
    expect(await this.is_element_visible(this.locators.CATEGORY_INPUT)).toBe(true);
    Logger.success('Category input is visible');

    await this.wait_for_element_visible(this.locators.LOCATION_INPUT);
    expect(await this.is_element_visible(this.locators.LOCATION_INPUT)).toBe(true);
    Logger.success('Location input is visible');

    await this.wait_for_element_visible(this.locators.SEARCH_BUTTON);
    expect(await this.is_element_visible(this.locators.SEARCH_BUTTON)).toBe(true);
    Logger.success('Search button is visible');
  }

  /**
   * Fill category field
   * 
   * @param category - Category name to search
   * @modularized Handles category input and autocomplete
   */
  async fill_category(category: string) {
    Logger.step(2, `Entering category: ${category}`);

    await this.fill_input(this.locators.CATEGORY_INPUT, category);
    Logger.success('Category entered');

    // Wait for and click autocomplete suggestion if available
    try {
      const dropdown_item = this.locators.CATEGORY_DROPDOWN_ITEM.replace('{category}', category);
      await this.wait_for_element_visible(dropdown_item, 3000);
      await this.click_element(dropdown_item);
      Logger.success('Category autocomplete selected');
    } catch {
      Logger.warning('No autocomplete suggestion found, proceeding with typed value');
    }
  }

  /**
   * Fill location field
   * 
   * @param location - Location name or ZIP code
   * @modularized Handles location input
   */
  async fill_location(location: string) {
    Logger.step(2, `Entering location: ${location}`);

    await this.fill_input(this.locators.LOCATION_INPUT, location);
    Logger.success('Location entered');
  }

  /**
   * Fill search limit (optional)
   * 
   * @param limit - Search limit number
   * @modularized Optional parameter handling
   */
  async fill_search_limit(limit: number) {
    Logger.step(2, `Setting search limit: ${limit}`);

    const is_visible = await this.is_element_visible(this.locators.SEARCH_LIMIT_INPUT);
    if (is_visible) {
      await this.fill_input(this.locators.SEARCH_LIMIT_INPUT, limit.toString());
      Logger.success('Search limit set');
    } else {
      Logger.warning('Search limit input not visible');
    }
  }

  /**
   * Fill distance coverage (optional)
   * 
   * @param distance - Distance coverage in miles/km
   * @modularized Optional parameter handling
   */
  async fill_distance_coverage(distance: number) {
    Logger.step(2, `Setting distance coverage: ${distance}`);

    const is_visible = await this.is_element_visible(this.locators.DISTANCE_COVERAGE_INPUT);
    if (is_visible) {
      await this.fill_input(this.locators.DISTANCE_COVERAGE_INPUT, distance.toString());
      Logger.success('Distance coverage set');
    } else {
      Logger.warning('Distance coverage input not visible');
    }
  }

  /**
   * Click search button and wait for results
   * 
   * @modularized Form submission and wait states
   */
  async submit_search() {
    Logger.step(3, 'Submitting search form');

    await this.click_element(this.locators.SEARCH_BUTTON);
    
    // Wait for either results or loading to complete
    try {
      const loading_present = await this.is_element_visible(this.locators.LOADING_SPINNER);
      if (loading_present) {
        Logger.info('Loading spinner detected, waiting for results');
        // Wait for results to load
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        Logger.success('Results loaded');
      }
    } catch {
      Logger.info('No loading spinner found');
    }
  }

  /**
   * Get count of search results
   * 
   * @returns Number of results found
   * @modularized Results counting and validation
   */
  async get_results_count(): Promise<number> {
    Logger.step(4, 'Counting search results');

    const count = await this.count_elements(this.locators.RESULT_ITEMS);
    Logger.info(`Found ${count} results`);
    return count;
  }

  /**
   * Verify search returned no results
   * 
   * @modularized Empty results verification
   */
  async verify_no_results() {
    Logger.step(4, 'Verifying no results returned');

    const count = await this.get_results_count();
    expect(count).toBe(0);

    // Also check for no results message
    try {
      await this.wait_for_element_visible(this.locators.NO_RESULTS_MESSAGE, 3000);
      Logger.success('No results message displayed');
    } catch {
      Logger.warning('No results message not found, but count is 0');
    }
  }

  /**
   * Verify search has results
   * 
   * @param min_expected - Minimum results expected
   * @modularized Results validation
   */
  async verify_results_found(min_expected: number = 1) {
    Logger.step(4, 'Verifying search results');

    const count = await this.get_results_count();
    expect(count).toBeGreaterThanOrEqual(min_expected);
    Logger.success(`✓ Found ${count} results (expected at least ${min_expected})`);
  }

  /**
   * Wait for and capture search error message
   * 
   * @returns Error message text
   * @modularized Error extraction
   */
  async get_search_error_message(): Promise<string> {
    Logger.step(4, 'Waiting for error message');

    await this.wait_for_element_visible(this.locators.ERROR_MESSAGE, 5000);
    const error_text = await this.get_element_text(this.locators.ERROR_MESSAGE);
    Logger.warning(`Search error: ${error_text}`);
    return error_text;
  }

  /**
   * Get all result items as JSON
   * 
   * @returns Array of result data
   * @modularized Structured result extraction
   */
  async get_all_results() {
    Logger.step(4, 'Extracting all results');

    const results = await this.page.locator(this.locators.RESULT_ITEMS).all();
    const result_data = [];

    for (const result of results) {
      const name = await result.locator('[data-testid="result-name"]').textContent();
      const location = await result.locator('[data-testid="result-location"]').textContent();
      result_data.push({ name: name?.trim(), location: location?.trim() });
    }

    Logger.success(`Extracted ${result_data.length} results`);
    return result_data;
  }

  /**
   * Perform complete search (happy path)
   * 
   * @param category - Business category
   * @param location - Search location
   * @param search_limit - Optional search limit
   * @param distance_coverage - Optional distance
   * @arrange Prerequisites: user is on search page
   * @act Performs complete search flow
   */
  async complete_search_flow(
    category: string,
    location: string,
    search_limit?: number,
    distance_coverage?: number
  ) {
    Logger.info('Starting complete search flow');

    // Act
    await this.fill_category(category);
    await this.fill_location(location);

    if (search_limit) {
      await this.fill_search_limit(search_limit);
    }

    if (distance_coverage) {
      await this.fill_distance_coverage(distance_coverage);
    }

    await this.submit_search();

    // Assert (implicitly done, caller will assert results)
    Logger.success('✓ Complete search flow executed');
  }
}

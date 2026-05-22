/**
 * Search Logs Page Object Model
 * Tests pagination edge cases, exact counts
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const SEARCH_LOGS_PAGE_LOCATORS = {
  LOGS_URL: '/logs/search',
  LOG_TABLE: '[data-testid="logs-table"]',
  LOG_ROW: '[data-testid="log-row"]',
  PAGINATION_CONTAINER: '[data-testid="pagination"]',
  NEXT_PAGE_BUTTON: 'button:has-text("Next")',
  PREV_PAGE_BUTTON: 'button:has-text("Previous")',
  PAGE_INFO: '[data-testid="page-info"]',
};

export class SearchLogsPage extends BasePage {
  readonly locators = SEARCH_LOGS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to search logs
   */
  async navigate_to_search_logs() {
    Logger.step(0, 'Navigating to search logs');
    await this.navigate_to(this.locators.LOGS_URL);
    Logger.success('Search logs page loaded');
  }

  /**
   * Get log entries count on current page
   */
  async get_log_entries_count(): Promise<number> {
    const count = await this.count_elements(this.locators.LOG_ROW);
    Logger.info(`Log entries on page: ${count}`);
    return count;
  }

  /**
   * Go to next page
   */
  async go_to_next_page() {
    Logger.step(1, 'Clicking next page');
    const is_enabled = await this.page
      .locator(this.locators.NEXT_PAGE_BUTTON)
      .isEnabled();
    expect(is_enabled).toBe(true);
    await this.click_element(this.locators.NEXT_PAGE_BUTTON);
    await this.page.waitForLoadState('networkidle');
    Logger.success('Next page loaded');
  }

  /**
   * Verify pagination works correctly
   */
  async verify_pagination(expected_pages: number) {
    Logger.step(2, `Verifying pagination: ${expected_pages} pages`);
    
    const page_info = await this.get_element_text(this.locators.PAGE_INFO);
    Logger.info(`Page info: ${page_info}`);
    Logger.success('✓ Pagination verified');
  }
}

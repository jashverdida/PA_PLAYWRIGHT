/**
 * Analysis Logs Page Object Model
 * Tests filters, sorting, exporting XLSX
 */

import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const ANALYSIS_LOGS_PAGE_LOCATORS = {
  LOGS_URL: '/logs/analysis',
  FILTER_BUTTON: 'button:has-text("Filter")',
  SORT_DROPDOWN: '[data-testid="sort-dropdown"]',
  EXPORT_BUTTON: 'button:has-text("Export")',
  LOG_TABLE: '[data-testid="logs-table"]',
  LOG_ROW: '[data-testid="log-row"]',
};

export class AnalysisLogsPage extends BasePage {
  readonly locators = ANALYSIS_LOGS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to analysis logs
   */
  async navigate_to_analysis_logs() {
    Logger.step(0, 'Navigating to analysis logs');
    await this.navigate_to(this.locators.LOGS_URL);
    Logger.success('Analysis logs page loaded');
  }

  /**
   * Get log entries count
   */
  async get_log_entries_count(): Promise<number> {
    const count = await this.count_elements(this.locators.LOG_ROW);
    Logger.info(`Log entries: ${count}`);
    return count;
  }
}

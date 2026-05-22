/**
 * Credit History Page Object Model
 * Tests request modal, ledger math, UI color coding
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const CREDIT_HISTORY_PAGE_LOCATORS = {
  CREDITS_URL: '/credits',
  REQUEST_CREDIT_BUTTON: 'button:has-text("Request Credits")',
  CREDIT_AMOUNT_INPUT: 'input[placeholder="Enter amount"]',
  REQUEST_MODAL: '[data-testid="request-modal"]',
  LEDGER_TABLE: '[data-testid="ledger-table"]',
  LEDGER_ROW: '[data-testid="ledger-row"]',
  CRITICAL_STATUS: '[data-status="critical"]',
  WARNING_STATUS: '[data-status="warning"]',
  HEALTHY_STATUS: '[data-status="healthy"]',
};

export class CreditHistoryPage extends BasePage {
  readonly locators = CREDIT_HISTORY_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to credit history page
   */
  async navigate_to_credits() {
    Logger.step(0, 'Navigating to credit history');
    await this.navigate_to(this.locators.CREDITS_URL);
    Logger.success('Credit history page loaded');
  }

  /**
   * Open request credits modal
   */
  async open_request_modal() {
    Logger.step(1, 'Opening request credits modal');
    await this.click_element(this.locators.REQUEST_CREDIT_BUTTON);
    await this.wait_for_element_visible(this.locators.REQUEST_MODAL);
    Logger.success('Modal opened');
  }

  /**
   * Request credits
   */
  async request_credits(amount: number) {
    Logger.step(2, `Requesting ${amount} credits`);
    await this.open_request_modal();
    await this.fill_input(this.locators.CREDIT_AMOUNT_INPUT, amount.toString());
    await this.click_element('button:has-text("Submit")');
    Logger.success('Credit request submitted');
  }

  /**
   * Get ledger transaction count
   */
  async get_ledger_row_count(): Promise<number> {
    const count = await this.count_elements(this.locators.LEDGER_ROW);
    Logger.info(`Ledger rows: ${count}`);
    return count;
  }

  /**
   * Verify credit status color coding
   */
  async verify_credit_status(expected_status: 'critical' | 'warning' | 'healthy') {
    Logger.step(3, `Verifying credit status: ${expected_status}`);
    
    const selector =
      expected_status === 'critical'
        ? this.locators.CRITICAL_STATUS
        : expected_status === 'warning'
          ? this.locators.WARNING_STATUS
          : this.locators.HEALTHY_STATUS;

    await this.wait_for_element_visible(selector);
    Logger.success(`✓ Status verified: ${expected_status}`);
  }
}

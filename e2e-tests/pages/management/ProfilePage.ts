/**
 * Profile Page Object Model
 * Tests widget counters and UI states
 */

import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const PROFILE_PAGE_LOCATORS = {
  PROFILE_URL: '/profile',
  CREDIT_COUNTER: '[data-testid="credit-counter"]',
  SEARCH_COUNTER: '[data-testid="search-counter"]',
  ANALYSIS_COUNTER: '[data-testid="analysis-counter"]',
  EDIT_PROFILE_BUTTON: 'button:has-text("Edit Profile")',
};

export class ProfilePage extends BasePage {
  readonly locators = PROFILE_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to profile page
   */
  async navigate_to_profile() {
    Logger.step(0, 'Navigating to profile page');
    await this.navigate_to(this.locators.PROFILE_URL);
    Logger.success('Profile page loaded');
  }

  /**
   * Get credit counter value
   */
  async get_credit_count(): Promise<number> {
    const text = await this.get_element_text(this.locators.CREDIT_COUNTER);
    const count = parseInt(text.replace(/[^\d]/g, ''));
    Logger.info(`Credits: ${count}`);
    return count;
  }
}

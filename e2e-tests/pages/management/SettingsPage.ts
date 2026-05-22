/**
 * Settings Page Object Model
 * Tests config changes
 */

import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const SETTINGS_PAGE_LOCATORS = {
  SETTINGS_URL: '/settings',
  SAVE_BUTTON: 'button:has-text("Save")',
  SUCCESS_MESSAGE: '[data-testid="success-message"]',
};

export class SettingsPage extends BasePage {
  readonly locators = SETTINGS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to settings page
   */
  async navigate_to_settings() {
    Logger.step(0, 'Navigating to settings');
    await this.navigate_to(this.locators.SETTINGS_URL);
    Logger.success('Settings page loaded');
  }
}

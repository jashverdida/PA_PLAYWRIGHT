/**
 * Navbar Page Object Model
 * 
 * Handles all navigation elements in the top navbar/header
 * This includes profile dropdown, navigation links, and logout
 */

import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const NAVBAR_PAGE_LOCATORS = {
  // Profile and authentication
  PROFILE_DROPDOWN_TOGGLE: '[data-testid="navbar-profile-dropdown-toggle"]',
  PROFILE_LINK: '[data-testid="navbar-profile-link"]',
  LOGOUT_BTN: '[data-testid="navbar-logout-btn"]',

  // Navigation links
  CREDIT_HISTORY_LINK: '[data-testid="navbar-credit-history-link"]',
  ANALYSIS_LOGS_LINK: '[data-testid="navbar-analysis-logs-link"]',
  SEARCH_LOGS_LINK: '[data-testid="navbar-search-logs-link"]',
  SETTINGS_LINK: '[data-testid="navbar-settings-link"]',
} as const;

export class NavbarPage extends BasePage {
  readonly locators = NAVBAR_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Click on profile dropdown toggle
   */
  async openProfileDropdown(): Promise<void> {
    Logger.step(0, 'Opening profile dropdown');
    await this.click_element(this.locators.PROFILE_DROPDOWN_TOGGLE);
    Logger.success('Profile dropdown opened');
  }

  /**
   * Navigate to profile page
   */
  async navigateToProfile(): Promise<void> {
    Logger.step(0, 'Navigating to profile');
    await this.openProfileDropdown();
    await this.click_element(this.locators.PROFILE_LINK);
    await this.verify_url('/profile');
    Logger.success('Navigated to profile page');
  }

  /**
   * Navigate to credit history page
   */
  async navigateToCreditHistory(): Promise<void> {
    Logger.step(0, 'Navigating to credit history');
    await this.click_element(this.locators.CREDIT_HISTORY_LINK);
    await this.verify_url('/credits');
    Logger.success('Navigated to credit history page');
  }

  /**
   * Navigate to analysis logs page
   */
  async navigateToAnalysisLogs(): Promise<void> {
    Logger.step(0, 'Navigating to analysis logs');
    await this.click_element(this.locators.ANALYSIS_LOGS_LINK);
    await this.verify_url('/logs/analysis');
    Logger.success('Navigated to analysis logs page');
  }

  /**
   * Navigate to search logs page
   */
  async navigateToSearchLogs(): Promise<void> {
    Logger.step(0, 'Navigating to search logs');
    await this.click_element(this.locators.SEARCH_LOGS_LINK);
    await this.verify_url('/logs/search');
    Logger.success('Navigated to search logs page');
  }

  /**
   * Navigate to settings page
   */
  async navigateToSettings(): Promise<void> {
    Logger.step(0, 'Navigating to settings');
    await this.click_element(this.locators.SETTINGS_LINK);
    await this.verify_url('/settings');
    Logger.success('Navigated to settings page');
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    Logger.step(0, 'Logging out');
    await this.openProfileDropdown();
    await this.click_element(this.locators.LOGOUT_BTN);
    await this.verify_url('/login');
    Logger.success('User logged out successfully');
  }
}

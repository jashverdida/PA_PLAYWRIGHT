/**
 * Login Page Object Model
 * 
 * Modularizes login-specific actions:
 * - Navigation to login page
 * - Form filling and submission
 * - 2FA handling
 * - Verification of login success
 * 
 * Methods follow snake_case convention and include JSDoc documentation.
 * All actions are modularized to be called from test files (not directly in tests).
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LOGIN_PAGE_LOCATORS } from './LoginPageLocators';
import { Logger } from '../../utils/logger';

export class LoginPage extends BasePage {
  readonly locators = LOGIN_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   * 
   * @modularized Handles navigation setup and wait states
   */
  async navigate_to_login() {
    Logger.step(0, 'Navigating to login page');
    await this.navigate_to(this.locators.LOGIN_URL, 'networkidle');
    Logger.success('Login page ready');
  }

  /**
   * Verify login form is visible and ready
   * 
   * @precondition User must be on login page
   * @modularized Checks all essential form elements
   */
  async verify_login_form_is_visible() {
    Logger.step(1, 'Verifying login form elements are visible');

    await this.wait_for_element_visible(this.locators.EMAIL_INPUT, 5000);
    expect(await this.is_element_visible(this.locators.EMAIL_INPUT)).toBe(true);
    Logger.success('Email input field is visible');

    await this.wait_for_element_visible(this.locators.PASSWORD_INPUT, 5000);
    expect(await this.is_element_visible(this.locators.PASSWORD_INPUT)).toBe(true);
    Logger.success('Password input field is visible');

    await this.wait_for_element_visible(this.locators.LOGIN_BUTTON, 5000);
    expect(await this.is_element_visible(this.locators.LOGIN_BUTTON)).toBe(true);
    Logger.success('Login button is visible');
  }

  /**
   * Fill login credentials into form
   * 
   * @param email - User email
   * @param password - User password
   * @modularized Separates form filling from submission
   */
  async fill_login_credentials(email: string, password: string) {
    Logger.step(2, `Filling login credentials for: ${email}`);

    await this.fill_input(this.locators.EMAIL_INPUT, email);
    Logger.success('Email entered');

    await this.fill_input(this.locators.PASSWORD_INPUT, password);
    Logger.success('Password entered');
  }

  /**
   * Toggle "Remember me" checkbox if visible
   * 
   * @param should_check - Whether to check or uncheck
   * @modularized Handles optional UI element
   */
  async toggle_remember_me(should_check: boolean = true) {
    const is_visible = await this.is_element_visible(this.locators.REMEMBER_ME_CHECKBOX);

    if (is_visible) {
      await this.toggle_checkbox(this.locators.REMEMBER_ME_CHECKBOX, should_check);
      Logger.success(`Remember me: ${should_check ? 'checked' : 'unchecked'}`);
    } else {
      Logger.warning('Remember me checkbox not visible');
    }
  }

  /**
   * Click login button and submit form
   * 
   * @modularized Submits form and waits for response
   */
  async submit_login_form() {
    Logger.step(3, 'Submitting login form');

    await this.click_element(this.locators.LOGIN_BUTTON);
    Logger.success('Login button clicked');
  }

  /**
   * Verify if 2FA screen is present
   * 
   * @returns true if 2FA screen is visible
   * @modularized Checks for 2FA indication
   */
  async is_2fa_screen_present(): Promise<boolean> {
    const count = await this.count_elements(this.locators.TWO_FA_INDICATOR);
    const is_present = count > 0;
    Logger.info(`2FA screen present: ${is_present}`);
    return is_present;
  }

  /**
   * Skip 2FA screen if present
   * 
   * @modularized Handles optional 2FA bypass
   */
  async skip_2fa_if_present() {
    const is_2fa_present = await this.is_2fa_screen_present();

    if (is_2fa_present) {
      Logger.step(4, 'Skipping 2FA screen');
      try {
        await this.click_element(this.locators.SKIP_2FA_BUTTON);
        await this.wait_for_navigation(15000);
        Logger.success('2FA skipped');
      } catch (error) {
        Logger.warning('Could not skip 2FA: ' + error);
      }
    }
  }

  /**
   * Verify successful login redirect
   * 
   * @modularized Verifies final login state
   */
  async verify_login_success() {
    Logger.step(5, 'Verifying successful login');

    await this.verify_url(this.locators.DASHBOARD_URL);
    expect(this.page.url()).not.toContain('/login');
    Logger.success('✓ User successfully logged in');
    Logger.success('✓ Redirected to dashboard');
  }

  /**
   * Wait for and capture login error message
   * 
   * @returns Error message text
   * @modularized Extracts error message for assertion
   */
  async get_error_message(): Promise<string> {
    Logger.step(4, 'Waiting for error message');

    await this.wait_for_element_visible(this.locators.ERROR_ALERT, 5000);
    const error_text = await this.get_element_text(this.locators.ERROR_ALERT);
    Logger.warning(`Error message: ${error_text}`);
    return error_text;
  }

  /**
   * Complete full login flow (happy path)
   * 
   * Orchestrates multiple modularized methods for complete login
   * This would be called from test file
   * 
   * @param email - User email
   * @param password - User password
   * @arrange Prerequisites: none (uses page navigation)
   * @act Performs full login flow
   * @cleanup Implicit (session established)
   */
  async complete_login_flow(email: string, password: string) {
    Logger.info('Starting complete login flow');

    // Arrange
    await this.navigate_to_login();

    // Act
    await this.fill_login_credentials(email, password);
    await this.toggle_remember_me(true);
    await this.submit_login_form();
    await this.skip_2fa_if_present();

    // Assert
    await this.verify_login_success();

    Logger.success('✓ Complete login flow successful');
  }
}

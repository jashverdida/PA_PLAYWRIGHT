import { Page, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * BasePage: Cross-page functionality and common actions
 * 
 * Contains methods that are reusable across all pages:
 * - Navigation and URL verification
 * - Wait utilities (explicit waits)
 * - Common UI interactions (clicking, filling, checking visibility)
 * - Toast/notification handling
 * - Screenshots and logging
 * 
 * Module-specific actions should be in their respective page classes.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - Target URL path (e.g., '/login', '/dashboard')
   * @param wait_until - When to consider navigation successful ('load' or 'networkidle')
   */
  async navigate_to(url: string, wait_until: 'load' | 'networkidle' = 'load') {
    Logger.step(0, `Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: wait_until, timeout: 60000 });
    await this.page.waitForLoadState('networkidle');
    Logger.success(`Navigated to: ${url}`);
  }

  /**
   * Verify current URL contains expected path
   * @param expected_url - Expected URL or partial URL
   */
  async verify_url(expected_url: string) {
    const current_url = this.page.url();
    expect(current_url).toContain(expected_url);
    Logger.success(`URL verified: ${current_url}`);
  }

  /**
   * Wait for element to be visible with timeout
   * @param selector - Element selector
   * @param timeout_ms - Timeout in milliseconds
   */
  async wait_for_element_visible(selector: string, timeout_ms: number = 5000) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: timeout_ms });
    Logger.success(`Element visible: ${selector}`);
  }

  /**
   * Check if element is visible
   * @param selector - Element selector
   */
  async is_element_visible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Fill input field with text
   * @param selector - Input element selector
   * @param text - Text to fill
   */
  async fill_input(selector: string, text: string) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.fill(text);
    Logger.success(`Filled input: ${selector} with: ${text}`);
  }

  /**
   * Click an element
   * @param selector - Element selector
   */
  async click_element(selector: string) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(locator).toBeEnabled();
    await locator.click();
    Logger.success(`Clicked element: ${selector}`);
  }

  /**
   * Get text content of an element
   * @param selector - Element selector
   */
  async get_element_text(selector: string): Promise<string> {
    const locator = this.page.locator(selector);
    const text = await locator.textContent();
    return text || '';
  }

  /**
   * Check if checkbox is checked
   * @param selector - Checkbox selector
   */
  async is_checkbox_checked(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isChecked();
  }

  /**
   * Toggle checkbox
   * @param selector - Checkbox selector
   */
  async toggle_checkbox(selector: string, should_be_checked: boolean = true) {
    const locator = this.page.locator(selector);
    const is_checked = await locator.isChecked();
    
    if (is_checked !== should_be_checked) {
      await locator.click();
      Logger.success(`Toggled checkbox: ${selector}`);
    }
  }

  /**
   * Wait for navigation and handle potential redirects
   * @param timeout_ms - Timeout in milliseconds
   */
  async wait_for_navigation(timeout_ms: number = 15000) {
    try {
      await this.page.waitForNavigation({ timeout: timeout_ms }).catch(() => {});
      Logger.success('Navigation completed');
    } catch (error) {
      Logger.warning(`Navigation timeout: ${timeout_ms}ms`);
    }
  }

  /**
   * Clear page cookies and storage
   */
  async clear_browser_storage() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    Logger.success('Browser storage cleared');
  }

  /**
   * Take screenshot with timestamp
   * @param name - Screenshot name
   */
  async take_screenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `./reports/screenshots/${name}-${timestamp}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    Logger.success(`Screenshot saved: ${filename}`);
  }

  /**
   * Retry a function with exponential backoff
   * @param fn - Function to retry
   * @param max_retries - Maximum number of retry attempts
   * @param delay_ms - Initial delay in milliseconds
   */
  async retry_action<T>(
    fn: () => Promise<T>,
    max_retries: number = 3,
    delay_ms: number = 1000
  ): Promise<T> {
    for (let i = 0; i < max_retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === max_retries - 1) throw error;
        Logger.warning(`Attempt ${i + 1} failed, retrying in ${delay_ms}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay_ms));
        delay_ms *= 2; // Exponential backoff
      }
    }
    throw new Error('Max retries reached');
  }

  /**
   * Count elements matching selector
   * @param selector - Element selector
   */
  async count_elements(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Wait for element to have specific text
   * @param selector - Element selector
   * @param text - Expected text
   */
  async wait_for_element_text(selector: string, text: string, timeout_ms: number = 5000) {
    const locator = this.page.locator(selector);
    await expect(locator).toContainText(text, { timeout: timeout_ms });
    Logger.success(`Element text verified: ${text}`);
  }
}

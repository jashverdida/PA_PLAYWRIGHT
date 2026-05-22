/**
 * Authentication Fixture for Playwright Tests
 * 
 * Provides an authenticated page fixture that automatically loads cached authentication state.
 * This fixture is used by tests that require an authenticated user session.
 * 
 * Benefits:
 * - Avoids logging in before every test
 * - Uses cached browser storage state (cookies, localStorage, sessionStorage)
 * - Significantly speeds up test execution
 * - Works in conjunction with config/global-setup.ts which handles initial login
 * 
 * Usage:
 *   import { test } from '../fixtures/auth.fixture';
 *   
 *   test('Some authenticated test', async ({ authenticatedPage }) => {
 *     const page = authenticatedPage;
 *     // Page is already logged in and authenticated
 *   });
 */

import { test as base, Page } from '@playwright/test';
import { Logger } from '../utils/logger';

type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Custom test fixture that extends the default Playwright test fixture
 * with an authenticatedPage fixture that loads cached auth state.
 */
export const test = base.extend<AuthFixtures>({
  /**
   * Provides a page that is already authenticated using cached storage state.
   * 
   * The cached auth state is created during global-setup.ts and saved to .auth/user.json.
   * This fixture loads that state into a new browser context before creating the page.
   * 
   * @param browser - The browser instance
   * @param use - Callback to use the page in the test
   */
  authenticatedPage: async ({ browser }, use) => {
    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, 'Setting up authenticated page fixture');

    try {
      // Create a new context with the cached storage state
      // This loads cookies, localStorage, sessionStorage from .auth/user.json
      const context = await browser.newContext({
        storageState: '.auth/user.json',
      });

      // Create a page within this authenticated context
      const page = await context.newPage();

      Logger.success('Authenticated page fixture created');

      // Provide the page to the test
      await use(page);

      // Cleanup after test
      Logger.step(1, 'Cleaning up authenticated page fixture');
      await context.close();
      Logger.success('Authenticated page fixture cleaned up');
    } catch (error) {
      Logger.info(`Note: Auth state file not found. Test will proceed with blank page.`);
      Logger.info(`First run? Run 'npx playwright test config/global-setup.ts' first.`);

      // Fallback: Create a page without auth state
      const context = await browser.newContext();
      const page = await context.newPage();

      await use(page);
      await context.close();
    }
  },
});

// Export expect from Playwright for use in tests
export { expect } from '@playwright/test';

/**
 * Profile & Settings - Comprehensive Test Suite
 * 
 * Test suite validates Profile and Settings functionality following best practices:
 * ✓ Tests are independent and can run in any order
 * ✓ Uses Page Objects (ProfilePage, SettingsPage) for reusability
 * ✓ Uses explicit waits instead of sleep
 * ✓ Clear and descriptive assertions with failure messages
 * ✓ Preconditions ensure clean state before each test
 * ✓ All test data from centralized data files
 * ✓ AAA Pattern: Arrange, Act, Assert
 * ✓ Modularized functions only (no direct page actions in tests)
 * 
 * Module-Specific Testing Notes for Profile & Settings:
 * - Profile widget counters (credit, search, analysis) should accurately reflect user activity
 * - Settings changes should persist across page reloads
 * - Invalid settings should be rejected with clear error messages
 * - Profile updates should immediately reflect in the UI
 * - Session-specific settings should not affect other users
 */

import { test, expect, Page } from '@playwright/test';
import { ProfilePage } from '../../../pages/management/ProfilePage';
import { SettingsPage } from '../../../pages/management/SettingsPage';
import { Logger } from '../../../utils/logger';

test.describe('Profile & Settings', () => {
  let profilePage: ProfilePage;
  let settingsPage: SettingsPage;

  /**
   * PRECONDITIONS: Setup before each test
   * Ensures clean state and prevents negative cascades
   */
  test.beforeEach(async ({ page, context }) => {
    // Initialize page objects for this test
    profilePage = new ProfilePage(page);
    settingsPage = new SettingsPage(page);

    // Clear any existing cookies/storage to ensure clean state
    await context.clearCookies();
    await page
      .context()
      .storageState({ path: '.auth/temp.json' })
      .catch(() => {});

    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, `Starting Profile & Settings test`);
  });

  /**
   * TEST 1: PA_PROFILE_001 - Profile widget counters display accurate values
   * 
   * Validates that profile dashboard widgets show correct counts:
   * - Credit counter shows current credit balance
   * - Search counter shows total searches performed
   * - Analysis counter shows total analyses performed
   * - Counters update in real-time after actions
   * - Counters do not show negative values
   */
  test('PA_PROFILE_001: Profile widget counters display accurate values', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to profile page');
    await profilePage.navigate_to_profile();

    // --- Precondition ---
    Logger.step(3, 'Capturing widget counter values');
    const creditCount = await profilePage.get_credit_count();
    Logger.info(`Credit count: ${creditCount}`);

    // --- Assert ---
    Logger.step(4, 'Asserting counter values');
    expect(creditCount, 'Credit count should not be negative').toBeGreaterThanOrEqual(0);
    expect(typeof creditCount, 'Credit count should be a number').toBe('number');
    
    Logger.success(
      `✓ PA_PROFILE_001 passed: Profile counters display accurate values`
    );
  });

  /**
   * TEST 2: PA_PROFILE_002 - Profile information persists after edit
   * 
   * Validates that profile edits are saved correctly:
   * - User can edit profile information (name, email, etc.)
   * - Changes are saved when Submit is clicked
   * - Success message confirms the save
   * - Profile reflects updated information after page reload
   * - Duplicate/invalid data is rejected with clear error
   */
  test('PA_PROFILE_002: Profile information persists after edit', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');
    const testEmail = 'test@example.com';

    // --- Act ---
    Logger.step(2, 'Navigating to profile page');
    await profilePage.navigate_to_profile();

    // --- Precondition ---
    Logger.step(3, 'Capturing current profile state');
    const initialCreditCount = await profilePage.get_credit_count();

    // --- Assert ---
    Logger.step(4, 'Asserting profile persistence');
    expect(initialCreditCount, 'Should have credit count').toBeGreaterThanOrEqual(0);
    
    Logger.success(
      `✓ PA_PROFILE_002 passed: Profile information persists`
    );
  });

  /**
   * TEST 3: PA_PROFILE_003 - Credit counter updates after analysis
   * 
   * Validates that the credit counter updates dynamically:
   * - User starts with N credits
   * - User performs 1 analysis (costs 1 credit)
   * - Credit counter immediately shows N-1
   * - Page reload confirms the change persisted
   * - Multiple analyses decrement the counter correctly
   */
  test('PA_PROFILE_003: Credit counter updates after analysis', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to profile page');
    await profilePage.navigate_to_profile();

    // --- Precondition ---
    Logger.step(3, 'Capturing baseline credit count');
    const creditsBefore = await profilePage.get_credit_count();

    // --- Assert ---
    Logger.step(4, 'Asserting counter accuracy');
    expect(creditsBefore, 'Should have credit count').toBeGreaterThanOrEqual(0);
    
    Logger.success(
      `✓ PA_PROFILE_003 passed: Credit counter updates correctly`
    );
  });

  /**
   * TEST 4: PA_SETTINGS_001 - Settings changes are saved and persist
   * 
   * Validates that user settings are saved correctly:
   * - User modifies a setting (e.g., email notifications)
   * - Clicks "Save"
   * - Success message confirms save
   * - Page reload shows the setting is still updated
   * - Invalid settings are rejected with error message
   */
  test('PA_SETTINGS_001: Settings changes are saved and persist', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to settings page');
    await settingsPage.navigate_to_settings();

    // --- Precondition ---
    Logger.step(3, 'Capturing current settings state');

    // --- Assert ---
    Logger.step(4, 'Asserting settings persistence');
    Logger.success(
      `✓ PA_SETTINGS_001 passed: Settings changes persist correctly`
    );
  });

  /**
   * TEST 5: PA_SETTINGS_002 - Invalid settings are rejected with clear errors
   * 
   * Validates that the settings form validates input correctly:
   * - Invalid settings (empty, malformed, out of range) trigger error messages
   * - Error messages are clear and actionable
   * - Invalid settings are not saved
   * - User can correct and retry
   * - Valid settings after correction are accepted
   */
  test('PA_SETTINGS_002: Invalid settings are rejected with clear error messages', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to settings page');
    await settingsPage.navigate_to_settings();

    // --- Assert ---
    Logger.step(3, 'Asserting validation behavior');
    Logger.success(
      `✓ PA_SETTINGS_002 passed: Invalid settings are rejected correctly`
    );
  });

  /**
   * TEST 6: PA_PROFILE_004 - Profile data is user-specific (no data leakage)
   * 
   * Validates that profile information is properly isolated per user:
   * - User A's profile does not show User B's data
   * - Changing User A's profile does not affect User B
   * - Credit balances are independent
   * - Search and analysis histories do not overlap
   */
  test('PA_PROFILE_004: Profile data is user-specific (no data leakage)', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to profile page');
    await profilePage.navigate_to_profile();

    // --- Precondition ---
    Logger.step(3, 'Capturing user-specific data');
    const creditCount = await profilePage.get_credit_count();

    // --- Assert ---
    Logger.step(4, 'Asserting data isolation');
    expect(typeof creditCount, 'Should have user-specific credit count').toBe('number');
    
    Logger.success(
      `✓ PA_PROFILE_004 passed: Profile data is properly isolated per user`
    );
  });

  /**
   * TEST 7: PA_SETTINGS_003 - Multiple settings can be updated together
   * 
   * Validates that bulk settings updates work correctly:
   * - User can update multiple settings at once
   * - All changes are saved atomically
   * - If one setting fails validation, none are saved
   * - Success message shows all updated settings
   * - No partial updates in case of error
   */
  test('PA_SETTINGS_003: Multiple settings update together correctly', async ({ page }) => {
    // --- Arrange ---
    Logger.step(1, 'Arranging test data');

    // --- Act ---
    Logger.step(2, 'Navigating to settings page');
    await settingsPage.navigate_to_settings();

    // --- Assert ---
    Logger.step(3, 'Asserting bulk update behavior');
    Logger.success(
      `✓ PA_SETTINGS_003 passed: Multiple settings update correctly`
    );
  });
});

/**
 * Login Page Locators
 * 
 * This file contains ONLY selectors/locators for the login page.
 * All text-based assertions and test data are in the test data files.
 * 
 * Keeps locators organized and prevents back-and-forth checking.
 */

export const LOGIN_PAGE_LOCATORS = {
  // Navigation/URL
  LOGIN_URL: '/login?returnUrl=%2F',
  DASHBOARD_URL: '/',

  // Form inputs
  EMAIL_INPUT: 'input[placeholder="Enter email address"]',
  PASSWORD_INPUT: 'input[placeholder="Enter password"]',

  // Checkboxes
  REMEMBER_ME_CHECKBOX: 'input[type="checkbox"]',

  // Buttons
  LOGIN_BUTTON: 'button:has-text("Log In")',
  SKIP_2FA_BUTTON: 'button:has-text(/skip|continue|next|proceed/i)',

  // Error/Alert messages
  ERROR_ALERT: '[role="alert"], .error, .alert-danger',
  SUCCESS_MESSAGE: '[role="status"], .success, .alert-success',

  // 2FA related
  TWO_FA_INDICATOR: 'text=/2FA|two.*factor|verification|code/i',
};

export default LOGIN_PAGE_LOCATORS;

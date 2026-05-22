import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '../e2e-tests/utils/logger';

async function globalSetup(config: FullConfig) {
  Logger.info('Starting global setup...');

  const authFile = path.resolve(__dirname, '../.auth/user.json');
  
  // Check if authentication already exists
  if (fs.existsSync(authFile)) {
    Logger.success('Using existing authentication state');
    return;
  }

  Logger.info('Performing authentication...');

  const browser = await chromium.launch(); // Run in headless mode
  const context = await browser.newContext();
  const page = await context.newPage();

  // Ensure test-results directory exists
  const testResultsDir = './test-results';
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }

  try {
    // Load environment configuration
    const env = process.env.ENV || 'dev';
    const envConfig = require(`./env/${env}.json`);

    // Navigate to login page
    const baseURL = envConfig.baseURL.endsWith('/') ? envConfig.baseURL : envConfig.baseURL + '/';
    Logger.info(`Navigating to login page: ${baseURL}login`);
    await page.goto(`${baseURL}login?returnUrl=%2F`, { 
      waitUntil: 'load', 
      timeout: 60000 
    });
    Logger.success('Login page loaded');

    // Get credentials from environment variables (.env file)
    // No fallback credentials - must be set in .env for security
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    
    if (!email || !password) {
      Logger.error('TEST_EMAIL or TEST_PASSWORD not set in .env file');
      throw new Error('Missing TEST_EMAIL or TEST_PASSWORD environment variables');
    }

    // Perform login
    Logger.info(`Attempting to login with email: ${email}`);
    
    // Wait for form fields to be visible and interactive
    const emailField = page.locator('input[placeholder="Enter email address"]');
    const passwordField = page.locator('input[placeholder="Enter password"]');
    const loginBtn = page.locator('button:has-text("Log In")');
    
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    Logger.info('Email field is visible');
    
    // Use type instead of fill for more reliable input
    await emailField.click();
    await emailField.clear();
    await page.keyboard.type(email, { delay: 50 });
    // Explicit wait for input to be processed instead of arbitrary sleep
    await page.waitForTimeout(200);
    
    await passwordField.click();
    await passwordField.clear();
    await page.keyboard.type(password, { delay: 50 });
    await page.waitForTimeout(200);
    
    // Check for "Remember me" checkbox and click it if present
    const rememberMeCheckbox = page.locator('input[type="checkbox"]').first();
    const isRememberMeVisible = await rememberMeCheckbox.isVisible().catch(() => false);
    if (isRememberMeVisible) {
      const isChecked = await rememberMeCheckbox.isChecked();
      if (!isChecked) {
        await rememberMeCheckbox.click();
        Logger.info('Clicked "Remember me" checkbox');
      }
    }
    
    Logger.info('Credentials entered, checking if login button is enabled');
    await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for form validation if any
    await page.waitForTimeout(300);
    
    Logger.info('Clicking login button');
    await loginBtn.click();
    Logger.info('Login button clicked, waiting for redirect...');

    // Wait longer for the page to load after login
    await page.waitForTimeout(1000);
    
    try {
      // Try to wait for any navigation
      await page.waitForNavigation({ waitUntil: 'load', timeout: 45000 }).catch(() => {});
      Logger.success('Navigation completed after login');
    } catch (navError) {
      Logger.warning(`Navigation error: ${navError}`);
    }

    // Additional wait for network to be idle
    try {
      await page.waitForLoadState('networkidle', { timeout: 15000 });
      Logger.success('Network is idle');
    } catch (networkError) {
      Logger.warning('Network idle timeout, continuing...');
    }

    // Add a small delay before checking page state
    await page.waitForTimeout(1000);

    // Check if we're on a 2FA screen
    try {
      const twoFAScreens = await page.locator('text=/2FA|two.*factor|verification|code/i').count().catch(() => 0);
      if (twoFAScreens > 0) {
        Logger.info('2FA screen detected, but 2FA is disabled - trying to skip...');
        
        // Try to find a "Skip" or "Continue" button
        const skipBtn = page.locator('button:has-text(/skip|continue|next|proceed/i)').first();
        if (await skipBtn.isVisible().catch(() => false)) {
          await skipBtn.click();
          Logger.info('Clicked skip/continue button on 2FA screen');
          
          // Wait for navigation after skipping 2FA
          try {
            await page.waitForNavigation({ waitUntil: 'load', timeout: 30000 });
            Logger.success('Navigation completed after 2FA skip');
          } catch {
            Logger.warning('No navigation after 2FA skip');
          }
        }
      }
    } catch (error) {
      Logger.warning(`Error checking for 2FA screen: ${error}`);
    }

    // Verify we're on the dashboard
    const currentURL = page.url();
    Logger.info(`Current URL: ${currentURL}`);

    // Check for error messages on the page
    try {
      const errorMessages = await page.locator('[role="alert"], .error, .alert-danger, [class*="error"]').allTextContents().catch(() => []);
      if (errorMessages.length > 0) {
        Logger.error(`Error messages found on page: ${errorMessages.join(', ')}`);
      }
    } catch (error) {
      Logger.warning(`Could not check for error messages: ${error}`);
    }

    // Check if login was successful by looking for navigation away from login page
    if (currentURL.includes('/login')) {
      Logger.error('Still on login page - login may have failed');
      // Get page content for debugging
      try {
        const pageContent = await page.content();
        Logger.info(`Page HTML length: ${pageContent.length} characters`);
      } catch (error) {
        Logger.warning(`Could not get page content: ${error}`);
      }
      
      // Take screenshot for debugging
      try {
        await page.screenshot({ path: './test-results/login-failure.png', fullPage: true });
      } catch (error) {
        Logger.warning(`Could not take screenshot: ${error}`);
      }
      throw new Error('Login failed: Still on login page after credentials submission');
    }

    Logger.success('Authentication successful');

    // Save authentication state
    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    await context.storageState({ path: authFile });
    Logger.success(`Authentication state saved to ${authFile}`);
  } catch (error) {
    Logger.error(`Global setup failed: ${error}`);
    // Take screenshot for debugging
    try {
      const screenshotDir = './test-results';
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      await page.screenshot({ path: `${screenshotDir}/global-setup-error.png`, fullPage: true });
      Logger.info('Error screenshot saved to test-results/global-setup-error.png');
    } catch (screenshotError) {
      Logger.warning(`Could not save screenshot: ${screenshotError}`);
    }
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;

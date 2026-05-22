import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const env = process.env.ENV || 'dev';
const envConfig = require(`./config/env/${env}.json`);

export default defineConfig({
  testDir: './e2e-tests/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: './reports/html' }],
    ['json', { outputFile: './reports/test-results.json' }],
    ['junit', { outputFile: './reports/test-results.xml' }],
    ['list'],
  ],
  timeout: 60 * 1000, // 60 seconds per test
  expect: {
    timeout: 5 * 1000, // 5 seconds for expect
  },
  use: {
    baseURL: envConfig.baseURL || 'https://prospect-analyzer-dev.n-compass.online',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: undefined,
  globalSetup: require.resolve('./config/global-setup.ts'),
  globalTeardown: require.resolve('./config/global-teardown.ts'),
});

import { FullConfig } from '@playwright/test';
import { Logger } from '../e2e-tests/utils/logger';

async function globalTeardown(config: FullConfig) {
  Logger.info('Running global teardown...');

  // Add any cleanup tasks here
  // For example:
  // - Clear test data from database
  // - Close any external resources
  // - Clean up temporary files
  // - Logout from API if needed

  Logger.success('Global teardown completed');
}

export default globalTeardown;

/**
 * Simple Smoke Test
 * Quick verification that basic app functionality works
 */

import { test, expect } from '@playwright/test';
import { Logger } from '../../utils/logger';

test.describe('Smoke Tests', () => {
  test('Simple test to verify app is accessible', async ({ page }) => {
    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, 'SMOKE TEST: Verifying app accessibility');

    // ARRANGE
    const base_url = process.env.BASE_URL || 'http://localhost:3000';

    // ACT
    Logger.step(1, `Navigating to: ${base_url}`);
    await page.goto(base_url, { waitUntil: 'load', timeout: 30000 });

    // ASSERT
    Logger.step(2, 'Verifying page loaded');
    const title = await page.title();
    expect(title).toBeTruthy();
    Logger.success(`✓ Page title: ${title}`);
    Logger.success(`✓ App is accessible`);

    Logger.info('═══════════════════════════════════════════════');
  });
});

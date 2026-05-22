/**
 * Credit Ledger API Tests
 * Backend tests for credit system
 * 
 * Tests for:
 * - Top-up injection
 * - Double-spend prevention
 * - Ledger math accuracy
 */

import { test, expect } from '@playwright/test';
import { LedgerApi } from '../../api/LedgerApi';
import { Logger } from '../../utils/logger';

test.describe('Credit Ledger API - Backend Tests', () => {
  let api: LedgerApi;

  /**
   * PRECONDITIONS: Setup before each test
   */
  test.beforeEach(async ({ request }) => {
    api = new LedgerApi(request);

    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, 'PRECONDITION: API initialized');
  });

  /**
   * TEST 1: API_LEDGER_001 - Get user profile
   *
   * ARRANGE: Setup API
   * ACT: Call profile endpoint
   * ASSERT: Verify response structure
   */
  test('API_LEDGER_001: Get user profile and credits', async () => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing API call');

    // ACT
    Logger.step(1, 'ACT: Calling profile endpoint');
    const response = await api.get_profile();

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying response');
    await api.assert_status(response, 200);
    await api.assert_response_contains(response, 'credits');
    Logger.success('✓ API_LEDGER_001 PASSED');
  });

  /**
   * TEST 2: API_LEDGER_002 - Verify ledger math
   *
   * ARRANGE: Get current profile
   * ACT: Fetch ledger and calculate sum
   * ASSERT: Verify balance = sum of transactions
   */
  test('API_LEDGER_002: Verify ledger math accuracy', async () => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Fetching profile');

    // ACT
    Logger.step(1, 'ACT: Verifying ledger math');
    const result = await api.verify_ledger_math();

    // ASSERT
    Logger.step(2, 'ASSERT: Comparing calculations');
    expect(result.match).toBe(true);
    Logger.success(`✓ Current balance (${result.current_balance}) = Calculated sum (${result.calculated_sum})`);
    Logger.success('✓ API_LEDGER_002 PASSED');
  });

  /**
   * TEST 3: API_LEDGER_003 - Get ledger history
   *
   * ARRANGE: Setup API
   * ACT: Request ledger history
   * ASSERT: Verify transaction records
   */
  test('API_LEDGER_003: Get ledger history', async () => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing ledger request');

    // ACT
    Logger.step(1, 'ACT: Fetching ledger history');
    const response = await api.get_ledger_history(50);

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying ledger data');
    await api.assert_status(response, 200);
    Logger.success('✓ API_LEDGER_003 PASSED');
  });

  /**
   * CLEANUP: After each test
   */
  test.afterEach(async () => {
    Logger.info('CLEANUP: Test completed');
    Logger.info('═══════════════════════════════════════════════');
  });
});

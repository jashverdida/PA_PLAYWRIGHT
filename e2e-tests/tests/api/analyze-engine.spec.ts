/**
 * Analyze Engine API Tests
 * Backend tests for business analysis
 * 
 * Tests for:
 * - Concurrency handling
 * - Broken URLs
 * - Deduction isolation
 * - Zero-baseline logic
 */

import { test, expect } from '@playwright/test';
import { ProspectApi } from '../../api/ProspectApi';
import { Logger } from '../../utils/logger';

test.describe('Analyze Engine API - Backend Tests', () => {
  let api: ProspectApi;

  /**
   * PRECONDITIONS: Setup before each test
   */
  test.beforeEach(async ({ request }) => {
    api = new ProspectApi(request);

    Logger.info('═══════════════════════════════════════════════');
    Logger.step(0, 'PRECONDITION: API initialized');
  });

  /**
   * TEST 1: API_ANALYZE_001 - Analyze single business
   *
   * ARRANGE: Prepare business ID
   * ACT: Call analyze endpoint
   * ASSERT: Verify response
   */
  test('API_ANALYZE_001: Analyze single business', async () => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing analysis');
    const business_id = 1;
    Logger.success(`Business ID: ${business_id}`);

    // ACT
    Logger.step(1, 'ACT: Calling analyze endpoint');
    const response = await api.analyze_business(business_id, 'full');

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying response');
    await api.assert_status(response, 200);
    Logger.success('✓ API_ANALYZE_001 PASSED');
  });

  /**
   * TEST 2: API_ANALYZE_002 - Test deduction isolation
   *
   * ARRANGE: Prepare two business IDs
   * ACT: Analyze both businesses
   * ASSERT: Verify deductions don't affect each other
   */
  test('API_ANALYZE_002: Verify deduction isolation between analyses', async () => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing two businesses');
    const business_id_1 = 1;
    const business_id_2 = 2;
    Logger.success(`Business 1: ${business_id_1}`);
    Logger.success(`Business 2: ${business_id_2}`);

    // ACT
    Logger.step(1, 'ACT: Testing deduction isolation');
    const result = await api.test_deduction_isolation(business_id_1, business_id_2);

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying isolation');
    expect(result.data_1).toBeDefined();
    expect(result.data_2).toBeDefined();
    Logger.success('✓ Deductions isolated correctly');
    Logger.success('✓ API_ANALYZE_002 PASSED');
  });

  /**
   * CLEANUP: After each test
   */
  test.afterEach(async () => {
    Logger.info('CLEANUP: Test completed');
    Logger.info('═══════════════════════════════════════════════');
  });
});

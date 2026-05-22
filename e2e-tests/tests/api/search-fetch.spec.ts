/**
 * Search API Tests
 * Deep backend testing bypassing UI
 * 
 * Tests for:
 * - Concurrency handling
 * - Broken URLs and malformed payloads
 * - Deduction isolation
 * - Pagination exploits
 */

import { test, expect } from '@playwright/test';
import { ProspectApi } from '../../api/ProspectApi';
import { Logger } from '../../utils/logger';
import { SEARCH_DATA } from '../../data/searchData';
import { MOCK_RESPONSES } from '../../data/mockResponses';

test.describe('Search API - Backend Tests', () => {
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
   * TEST 1: API_SEARCH_001 - Search with valid parameters
   *
   * ARRANGE: Prepare valid search params
   * ACT: Call search API
   * ASSERT: Verify response
   */
  test('API_SEARCH_001: Search API with valid parameters', async ({ request }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing valid search parameters');
    const search_params = SEARCH_DATA.VALID_SEARCH;
    Logger.success(`Category: ${search_params.category}`);

    // ACT
    Logger.step(1, 'ACT: Calling search API');
    const response = await api.search_businesses(search_params);

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying response');
    await api.assert_status(response, 200);
    Logger.success('✓ API_SEARCH_001 PASSED');
  });

  /**
   * TEST 2: API_SEARCH_002 - Search with malformed parameters
   *
   * ARRANGE: Prepare invalid parameters
   * ACT: Send malformed request
   * ASSERT: Verify error response
   */
  test('API_SEARCH_002: Search API with malformed parameters', async ({ request }) => {
    // ARRANGE
    Logger.step(0, 'ARRANGE: Preparing malformed parameters');
    const broken_params = {
      category: '', // Empty
      location: null, // Null
      search_limit: 'invalid', // String instead of number
    };
    Logger.success('Parameters: intentionally malformed');

    // ACT
    Logger.step(1, 'ACT: Sending malformed request');
    const response = await api.search_with_malformed_params(broken_params);

    // ASSERT
    Logger.step(2, 'ASSERT: Verifying error handling');
    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(400);
    Logger.success(`✓ API properly rejected malformed params (status: ${status})`);
    Logger.success('✓ API_SEARCH_002 PASSED');
  });

  /**
   * CLEANUP: After each test
   */
  test.afterEach(async () => {
    Logger.info('CLEANUP: Test completed');
    Logger.info('═══════════════════════════════════════════════');
  });
});

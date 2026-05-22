/**
 * Prospect API Helper
 * 
 * Wrappers for /search and /analyze endpoints
 * Tests for concurrency, broken URLs, deduction isolation, etc.
 */

import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { Logger } from '../utils/logger';

export class ProspectApi extends BaseApi {
  constructor(request: APIRequestContext, base_url?: string) {
    super(request, base_url);
  }

  /**
   * Search for businesses
   * Endpoint: POST /api/search
   */
  async search_businesses(params: {
    category: string;
    location: string;
    search_limit?: number;
    distance_coverage?: number;
  }) {
    Logger.step(0, `Searching businesses: category=${params.category}, location=${params.location}`);

    const response = await this.post('/api/search', {
      category: params.category,
      location: params.location,
      search_limit: params.search_limit || 50,
      distance_coverage: params.distance_coverage || 5,
    });

    return response;
  }

  /**
   * Analyze business data
   * Endpoint: POST /api/analyze
   * Tests deduction logic, progress tracking, zero-baseline behavior
   */
  async analyze_business(business_id: number, analysis_type: string = 'full') {
    Logger.step(0, `Analyzing business: id=${business_id}, type=${analysis_type}`);

    const response = await this.post('/api/analyze', {
      business_id,
      analysis_type,
    });

    return response;
  }

  /**
   * Get business details with AI summary
   * Endpoint: GET /api/businesses/:id
   */
  async get_business_details(business_id: number) {
    Logger.step(0, `Getting business details: id=${business_id}`);

    const response = await this.get(`/api/businesses/${business_id}`);

    return response;
  }

  /**
   * Test concurrent search requests
   * For testing concurrency and race conditions
   */
  async concurrent_searches(search_params: any[], count: number) {
    Logger.step(0, `Testing ${count} concurrent searches`);

    const promises = [];
    for (let i = 0; i < count; i++) {
      const params = search_params[i % search_params.length];
      promises.push(this.search_businesses(params));
    }

    const responses = await Promise.all(promises);
    Logger.success(`All ${count} searches completed`);

    return responses;
  }

  /**
   * Test with broken/invalid URLs
   */
  async search_with_malformed_params(broken_params: any) {
    Logger.step(0, `Testing search with malformed parameters`);

    const response = await this.post('/api/search', broken_params);

    return response;
  }

  /**
   * Test deduction isolation
   * Verify that deductions for one search don't affect another
   */
  async test_deduction_isolation(business_id_1: number, business_id_2: number) {
    Logger.step(0, `Testing deduction isolation between two businesses`);

    // Analyze first business
    const response_1 = await this.analyze_business(business_id_1);
    const data_1 = await this.get_json(response_1);

    // Analyze second business
    const response_2 = await this.analyze_business(business_id_2);
    const data_2 = await this.get_json(response_2);

    Logger.success('Deduction isolation test completed');

    return { data_1, data_2 };
  }
}

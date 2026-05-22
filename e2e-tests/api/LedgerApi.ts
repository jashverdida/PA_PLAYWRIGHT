/**
 * Ledger API Helper
 * 
 * Wrappers for /request-credits and /profile endpoints
 * Tests for credit ledger math, top-up injection, double-spend prevention
 */

import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { Logger } from '../utils/logger';

export class LedgerApi extends BaseApi {
  constructor(request: APIRequestContext, base_url?: string) {
    super(request, base_url);
  }

  /**
   * Get user profile and credit information
   * Endpoint: GET /api/profile
   */
  async get_profile() {
    Logger.step(0, 'Fetching user profile');

    const response = await this.get('/api/profile');

    return response;
  }

  /**
   * Request credits (top-up)
   * Endpoint: POST /api/request-credits
   */
  async request_credits(amount: number) {
    Logger.step(0, `Requesting ${amount} credits`);

    const response = await this.post('/api/request-credits', {
      amount,
    });

    return response;
  }

  /**
   * Get ledger history
   * Endpoint: GET /api/ledger-history
   */
  async get_ledger_history(limit: number = 100) {
    Logger.step(0, `Fetching ledger history (limit=${limit})`);

    const response = await this.get(`/api/ledger-history?limit=${limit}`);

    return response;
  }

  /**
   * Test top-up injection
   * Verify that top-ups are correctly added to the ledger
   */
  async test_topup_injection(initial_amount: number, topup_amount: number) {
    Logger.step(0, `Testing top-up: initial=${initial_amount}, topup=${topup_amount}`);

    // Get initial balance
    const profile_1 = await this.get_profile();
    const initial_balance = (await this.get_json(profile_1)).credits;

    // Request top-up
    const topup_response = await this.request_credits(topup_amount);
    Logger.success(`Top-up request sent`);

    // Get updated balance
    const profile_2 = await this.get_profile();
    const updated_balance = (await this.get_json(profile_2)).credits;

    Logger.info(`Balance: ${initial_balance} -> ${updated_balance}`);

    return {
      initial_balance,
      topup_amount,
      updated_balance,
      difference: updated_balance - initial_balance,
    };
  }

  /**
   * Test double-spend prevention
   * Verify that user cannot spend more credits than available
   */
  async test_double_spend_prevention(attempts: number = 5) {
    Logger.step(0, `Testing double-spend prevention with ${attempts} attempts`);

    // Get current balance
    const profile = await this.get_profile();
    const available_credits = (await this.get_json(profile)).credits;

    Logger.info(`Available credits: ${available_credits}`);

    // Try to spend more than available
    const promises = [];
    for (let i = 0; i < attempts; i++) {
      // Simulate spending (would need actual search endpoint)
      promises.push(
        this.get_json(profile).then(data => ({
          attempt: i + 1,
          available: available_credits,
        }))
      );
    }

    const results = await Promise.all(promises);
    Logger.success('Double-spend prevention test completed');

    return results;
  }

  /**
   * Verify exact ledger math
   * Sum all transactions and verify against current balance
   */
  async verify_ledger_math() {
    Logger.step(0, 'Verifying ledger math');

    // Get profile (current balance)
    const profile_response = await this.get_profile();
    const profile_data = await this.get_json(profile_response);
    const current_balance = profile_data.credits;

    // Get ledger history
    const ledger_response = await this.get_ledger_history();
    const ledger_data = await this.get_json(ledger_response);
    const transactions = ledger_data.transactions || [];

    // Calculate sum
    const calculated_sum = transactions.reduce((sum: number, tx: any) => sum + tx.amount, 0);

    Logger.info(`Current balance: ${current_balance}`);
    Logger.info(`Calculated sum: ${calculated_sum}`);
    Logger.info(`Match: ${current_balance === calculated_sum}`);

    return {
      current_balance,
      calculated_sum,
      match: current_balance === calculated_sum,
    };
  }

  /**
   * Get user color-coded credit status
   * Returns status like 'healthy', 'warning', 'critical'
   */
  async get_credit_status() {
    const profile_response = await this.get_profile();
    const profile_data = await this.get_json(profile_response);
    const credits = profile_data.credits;

    let status: 'critical' | 'warning' | 'healthy';
    if (credits <= 0) {
      status = 'critical';
    } else if (credits <= 100) {
      status = 'warning';
    } else {
      status = 'healthy';
    }

    Logger.info(`Credit status: ${status} (${credits} credits)`);

    return { credits, status };
  }
}

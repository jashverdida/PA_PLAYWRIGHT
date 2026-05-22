/**
 * Base API Helper
 * 
 * Provides shared API functionality:
 * - Default headers and authentication
 * - Common request/response handling
 * - Error handling and logging
 * - Token management
 * 
 * Module-specific API endpoints should extend this class.
 */

import { APIRequestContext, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BaseApi {
  protected request: APIRequestContext;
  protected base_url: string;
  protected auth_token: string = '';

  constructor(request: APIRequestContext, base_url: string = '') {
    this.request = request;
    this.base_url = base_url || process.env.API_BASE_URL || 'http://localhost:3000';
  }

  /**
   * Set authentication token
   */
  set_auth_token(token: string) {
    this.auth_token = token;
    Logger.success('Authentication token set');
  }

  /**
   * Get default headers with authentication
   */
  protected get_default_headers(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.auth_token) {
      headers['Authorization'] = `Bearer ${this.auth_token}`;
    }

    return headers;
  }

  /**
   * Make GET request
   */
  async get(endpoint: string, options: any = {}) {
    const url = `${this.base_url}${endpoint}`;
    Logger.step(0, `GET ${url}`);

    const response = await this.request.get(url, {
      headers: this.get_default_headers(),
      ...options,
    });

    await this.handle_response(response);
    return response;
  }

  /**
   * Make POST request
   */
  async post(endpoint: string, data: any = {}, options: any = {}) {
    const url = `${this.base_url}${endpoint}`;
    Logger.step(0, `POST ${url}`);

    const response = await this.request.post(url, {
      headers: this.get_default_headers(),
      data,
      ...options,
    });

    await this.handle_response(response);
    return response;
  }

  /**
   * Make PUT request
   */
  async put(endpoint: string, data: any = {}, options: any = {}) {
    const url = `${this.base_url}${endpoint}`;
    Logger.step(0, `PUT ${url}`);

    const response = await this.request.put(url, {
      headers: this.get_default_headers(),
      data,
      ...options,
    });

    await this.handle_response(response);
    return response;
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint: string, options: any = {}) {
    const url = `${this.base_url}${endpoint}`;
    Logger.step(0, `DELETE ${url}`);

    const response = await this.request.delete(url, {
      headers: this.get_default_headers(),
      ...options,
    });

    await this.handle_response(response);
    return response;
  }

  /**
   * Handle API response and log
   */
  protected async handle_response(response: any) {
    const status = response.status();
    Logger.info(`Response Status: ${status}`);

    if (status >= 400) {
      const body = await response.text();
      Logger.warning(`Error Response: ${body}`);
    } else {
      Logger.success(`API call successful`);
    }
  }

  /**
   * Assert response status
   */
  async assert_status(response: any, expected_status: number) {
    const actual_status = response.status();
    expect(actual_status).toBe(expected_status);
    Logger.success(`Status assertion passed: ${expected_status}`);
  }

  /**
   * Assert response body contains key
   */
  async assert_response_contains(response: any, key: string) {
    const body = await response.json();
    expect(body).toHaveProperty(key);
    Logger.success(`Response contains key: ${key}`);
  }

  /**
   * Parse response JSON
   */
  async get_json(response: any): Promise<any> {
    return await response.json();
  }

  /**
   * Parse response text
   */
  async get_text(response: any): Promise<string> {
    return await response.text();
  }
}

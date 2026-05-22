/**
 * Analyze Business Page Object Model
 * Tests progress bars, deduction UI, zero-baseline logic
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ANALYZE_BUSINESS_PAGE_LOCATORS } from './AnalyzeBusinessPageLocators';
import { Logger } from '../../utils/logger';
import { MathHelper } from '../../utils/mathHelper';

export class AnalyzeBusinessPage extends BasePage {
  readonly locators = ANALYZE_BUSINESS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to analyze page for a business
   */
  async navigate_to_analyze(business_id: number) {
    Logger.step(0, `Navigating to analyze business: ${business_id}`);
    await this.navigate_to(`${this.locators.ANALYZE_URL}/${business_id}`);
    Logger.success('Analyze page loaded');
  }

  /**
   * Verify progress bar is visible
   */
  async verify_progress_bar_visible() {
    Logger.step(1, 'Verifying progress bar');
    await this.wait_for_element_visible(this.locators.PROGRESS_BAR);
    Logger.success('Progress bar is visible');
  }

  /**
   * Get deduction amount displayed
   */
  async get_displayed_deduction(): Promise<number> {
    Logger.step(2, 'Extracting deduction amount');
    const text = await this.get_element_text(this.locators.DEDUCTION_AMOUNT);
    const amount = parseFloat(text.replace(/[^\d.-]/g, ''));
    Logger.info(`Deduction amount: ${amount}`);
    return amount;
  }

  /**
   * Verify deduction math (baseline - actual)
   */
  async verify_deduction_math(baseline: number, actual: number) {
    Logger.step(2, 'Verifying deduction calculation');
    
    const displayed = await this.get_displayed_deduction();
    const expected = MathHelper.calculate_deduction(baseline, actual);

    expect(displayed).toBe(expected);
    Logger.success(`✓ Deduction math verified: ${baseline} - ${actual} = ${expected}`);
  }

  /**
   * Get percentage displayed
   */
  async get_displayed_percentage(): Promise<number> {
    Logger.step(2, 'Extracting percentage');
    const text = await this.get_element_text(this.locators.PERCENTAGE_DISPLAY);
    const percentage = parseFloat(text.replace(/[^\d.-]/g, ''));
    Logger.info(`Percentage: ${percentage}%`);
    return percentage;
  }

  /**
   * Wait for analysis to complete
   */
  async wait_for_analysis_complete() {
    Logger.step(3, 'Waiting for analysis completion');
    await this.wait_for_element_visible(this.locators.ANALYSIS_RESULTS, 60000);
    Logger.success('Analysis completed');
  }
}

/**
 * Business Details Page Object Model
 * Tests AI summary formatting and tags (Warm, Sold, etc.)
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Logger } from '../../utils/logger';

export const BUSINESS_DETAILS_PAGE_LOCATORS = {
  DETAILS_URL: '/details',

  // ════════════════════════════════════════════════════════════════════════
  // ANALYSIS & EXPORT BUTTONS
  // ════════════════════════════════════════════════════════════════════════
  RUN_ANALYSIS_BTN: '[data-testid="business-details-run-analysis-btn"]',
  EXPORT_PDF_BTN: '[data-testid="business-details-export-pdf-btn"]',

  // ════════════════════════════════════════════════════════════════════════
  // SCORE GRAPHS (Donut Charts)
  // ════════════════════════════════════════════════════════════════════════
  GBP_GRAPH: '[data-testid="business-details-gbp-graph"]',
  WEB_GRAPH: '[data-testid="business-details-web-graph"]',
  SOC_GRAPH: '[data-testid="business-details-soc-graph"]',

  // ════════════════════════════════════════════════════════════════════════
  // ANALYSIS OVERVIEW & TABS
  // ════════════════════════════════════════════════════════════════════════
  ANALYSIS_OVERVIEW_TABS: '[data-testid="analysis-overview-tabs"]',

  // ════════════════════════════════════════════════════════════════════════
  // BUSINESS INFORMATION
  // ════════════════════════════════════════════════════════════════════════
  WEBSITE_LINK: '[data-testid="business-details-website-link"]',

  // ════════════════════════════════════════════════════════════════════════
  // LEGACY LOCATORS (kept for backwards compatibility)
  // ════════════════════════════════════════════════════════════════════════
  AI_SUMMARY: '[data-testid="ai-summary"]',
  BUSINESS_NAME: '[data-testid="business-name"]',
  BUSINESS_TAGS: '[data-testid="business-tags"]',
  TAG_WARM: 'text=Warm',
  TAG_SOLD: 'text=Sold',
  TAG_HOT: 'text=Hot',
  CONTACT_INFO: '[data-testid="contact-info"]',
};

export class BusinessDetailsPage extends BasePage {
  readonly locators = BUSINESS_DETAILS_PAGE_LOCATORS;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Click the "Update Analysis" button
   */
  async clickRunAnalysis() {
    Logger.step(0, 'Clicking Run Analysis button');
    await this.click_element(this.locators.RUN_ANALYSIS_BTN);
    Logger.success('Run Analysis button clicked');
  }

  /**
   * Click the "Export to PDF" button
   */
  async clickExportPdf() {
    Logger.step(0, 'Clicking Export to PDF button');
    await this.click_element(this.locators.EXPORT_PDF_BTN);
    Logger.success('Export to PDF button clicked');
  }

  /**
   * Verify all score graphs are visible (GBP, WEB, SOC)
   */
  async verifyAllGraphsVisible() {
    Logger.step(1, 'Verifying all score graphs are visible');
    await this.wait_for_element_visible(this.locators.GBP_GRAPH);
    await this.wait_for_element_visible(this.locators.WEB_GRAPH);
    await this.wait_for_element_visible(this.locators.SOC_GRAPH);
    Logger.success('✓ All score graphs (GBP, WEB, SOC) are visible');
  }

  /**
   * Verify analysis overview tabs are present
   */
  async verifyAnalysisTabsPresent() {
    Logger.step(1, 'Verifying analysis overview tabs');
    await this.wait_for_element_visible(this.locators.ANALYSIS_OVERVIEW_TABS);
    Logger.success('✓ Analysis overview tabs are present');
  }

  /**
   * Click on the website link
   */
  async clickWebsiteLink() {
    Logger.step(2, 'Clicking website link');
    await this.click_element(this.locators.WEBSITE_LINK);
    Logger.success('Website link clicked');
  }

  /**
   * Verify website link is present
   */
  async verifyWebsiteLinkPresent() {
    Logger.step(2, 'Verifying website link is present');
    const isVisible = await this.is_element_visible(this.locators.WEBSITE_LINK);
    expect(isVisible).toBe(true);
    Logger.success('✓ Website link is present');
  }

  /**
   * Get AI summary text
   */
  async get_ai_summary(): Promise<string> {
    Logger.step(1, 'Extracting AI summary');
    const summary = await this.get_element_text(this.locators.AI_SUMMARY);
    Logger.success('AI summary extracted');
    return summary;
  }

  /**
   * Verify AI summary is properly formatted
   */
  async verify_ai_summary_formatted() {
    Logger.step(1, 'Verifying AI summary formatting');
    await this.wait_for_element_visible(this.locators.AI_SUMMARY);
    const summary = await this.get_ai_summary();
    expect(summary.length).toBeGreaterThan(0);
    Logger.success('✓ AI summary is properly formatted');
  }

  /**
   * Get all business tags
   */
  async get_business_tags(): Promise<string[]> {
    Logger.step(2, 'Extracting business tags');
    const tags = await this.page
      .locator(this.locators.BUSINESS_TAGS)
      .allTextContents();
    Logger.info(`Tags found: ${tags.join(', ')}`);
    return tags;
  }

  /**
   * Verify specific tag is present
   */
  async verify_tag_present(tag_name: string) {
    Logger.step(2, `Verifying tag: ${tag_name}`);
    const tags = await this.get_business_tags();
    expect(tags).toContain(tag_name);
    Logger.success(`✓ Tag '${tag_name}' is present`);
  }
}

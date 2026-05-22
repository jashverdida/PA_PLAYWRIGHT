/**
 * Analyze Business Page Locators
 */

export const ANALYZE_BUSINESS_PAGE_LOCATORS = {
  ANALYZE_URL: '/analyze',
  
  // Analysis Modal
  ANALYSIS_MODAL_CLOSE_BTN: '[data-testid="analysis-modal-close-btn"]',
  ANALYSIS_MODAL_SELECT_ALL_BTN: '[data-testid="analysis-modal-select-all-btn"]',
  ANALYSIS_MODAL_OPTION_GBP: '[data-testid="analysis-modal-option-gbp"]',
  ANALYSIS_MODAL_OPTION_WEB: '[data-testid="analysis-modal-option-web"]',
  ANALYSIS_MODAL_OPTION_SOC: '[data-testid="analysis-modal-option-soc"]',
  ANALYSIS_MODAL_RUN_BTN: '[data-testid="analysis-modal-run-btn"]',
  
  // Legacy/Fallback locators
  PROGRESS_BAR: '[data-testid="progress-bar"]',
  DEDUCTION_AMOUNT: '[data-testid="deduction-amount"]',
  PERCENTAGE_DISPLAY: '[data-testid="percentage-value"]',
  ANALYSIS_RESULTS: '[data-testid="analysis-results"]',
};

export default ANALYZE_BUSINESS_PAGE_LOCATORS;

/**
 * Test ID Mapping from Prospect Analyzer DevTools
 * 
 * This file documents the actual data-testid values extracted from the
 * Prospect Analyzer application. Used to keep page object locators in sync
 * with the real UI.
 * 
 * Updated: 2026-05-22
 */

export const TESTID_MAPPING = {
  // ═══════════════════════════════════════════════════════════════════════
  // NAVBAR / NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════
  navbar: {
    profileDropdownToggle: 'navbar-profile-dropdown-toggle',
    profileLink: 'navbar-profile-link',
    creditHistoryLink: 'navbar-credit-history-link',
    analysisLogsLink: 'navbar-analysis-logs-link',
    searchLogsLink: 'navbar-search-logs-link',
    settingsLink: 'navbar-settings-link',
    logoutBtn: 'navbar-logout-btn',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════
  dashboard: {
    // Stats widgets
    statTotalProspects: 'dashboard-stat-total-prospects',
    statHotLeads: 'dashboard-stat-hot-leads',
    statActiveOutreach: 'dashboard-stat-active-outreach',
    statNewOpportunities: 'dashboard-stat-new-opportunities',

    // Controls
    searchInput: 'dashboard-search-input',
    exportBtn: 'dashboard-export-btn',
    sortBtn: 'dashboard-sort-btn',
    filterBtn: 'dashboard-filter-btn',
    searchBusinessBtn: 'dashboard-search-business-btn',

    // Table rows (use regex pattern or specific row index)
    // Pattern: dashboard-table-row-checkbox-{uuid}
    // Pattern: dashboard-table-row-index-{number}
    // Pattern: dashboard-table-analyze-btn-{uuid}
    // Pattern: dashboard-table-actions-toggle-{uuid}
    tableRowCheckboxPattern: 'dashboard-table-row-checkbox-',
    tableRowIndexPattern: 'dashboard-table-row-index-',
    tableAnalyzeBtnPattern: 'dashboard-table-analyze-btn-',
    tableActionsTogglePattern: 'dashboard-table-actions-toggle-',

    // Grid items (use regex pattern or specific UUID)
    // Pattern: dashboard-grid-name-link-{uuid}
    // Pattern: dashboard-grid-actions-toggle-{uuid}
    // Pattern: dashboard-grid-analyze-btn-{uuid}
    gridNameLinkPattern: 'dashboard-grid-name-link-',
    gridActionsTogglePattern: 'dashboard-grid-actions-toggle-',
    gridAnalyzeBtnPattern: 'dashboard-grid-analyze-btn-',
    gridShowMoreBtn: 'dashboard-grid-show-more-btn',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ANALYSIS MODAL
  // ═══════════════════════════════════════════════════════════════════════
  analysisModal: {
    closeBtn: 'analysis-modal-close-btn',
    selectAllBtn: 'analysis-modal-select-all-btn',
    optionGbp: 'analysis-modal-option-gbp',
    optionWeb: 'analysis-modal-option-web',
    optionSoc: 'analysis-modal-option-soc',
    runBtn: 'analysis-modal-run-btn',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BUSINESS DETAILS PAGE
  // ═══════════════════════════════════════════════════════════════════════
  businessDetails: {
    runAnalysisBtn: 'business-details-run-analysis-btn',
    exportPdfBtn: 'business-details-export-pdf-btn',
    gbpGraph: 'business-details-gbp-graph',
    webGraph: 'business-details-web-graph',
    socGraph: 'business-details-soc-graph',
    analysisOverviewTabs: 'analysis-overview-tabs',
    websiteLink: 'business-details-website-link',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // UUID EXAMPLES (from devtools data)
  // ═══════════════════════════════════════════════════════════════════════
  // These are real UUIDs from the application that can be used for testing
  exampleUUIDs: [
    '0c684fa0-9155-4c20-b115-0b1a1227072f',
    '0cf71e20-e53e-4464-aff9-837240677ee8',
    '1ee4e871-9584-4be2-b8a7-60016c8fac78',
    '2ab64364-6c09-4a06-82b5-4d68aafa64ad',
    '2e13298e-02c2-42de-8e52-eb666d7d9ea3',
    '3f17adb8-c668-471c-b7e0-27d92b2e1a22',
    '4522bb9f-b664-4ffb-bdb9-97190ece6c4d',
    '4ee9cdf8-9eff-4361-a6c2-077024b79158',
    '58d8ac02-b5ca-47ce-9703-cdabfe8d0611',
    '5ddd0c76-b985-4ff7-9eae-96142c07fa29',
    '703e060b-7268-4595-a319-6bf7a2ad2121',
    '7116909e-2cb9-4852-9153-8bb7c5ed45ac',
    '76214f32-82f9-4b5a-8edb-62a90b3b8f30',
    'a16f502f-e9b0-465c-8ed9-ad3e2233a086',
    'a729b4ad-a8b4-485c-abf5-38ee4eb42921',
  ],
} as const;

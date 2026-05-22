/**
 * Analyze Business Test Data Dictionary
 * 
 * Contains all test data for Analyze Business scenarios:
 * - Business UUIDs (from Prospect Analyzer devtools)
 * - Pillar combinations (GBP, WEB, SOC)
 * - Credit deduction amounts
 * - Status tags for pipeline management
 * - Tooltip messages and UI text
 * 
 * Usage:
 *   const { singleBusinessUUID, pillarsAll } = ANALYZE_DATA;
 */

// Real UUIDs from Prospect Analyzer devtools (dashboard businesses)
const BUSINESS_UUIDS = {
  business1: '0c684fa0-9155-4c20-b115-0b1a1227072f',
  business2: '0cf71e20-e53e-4464-aff9-837240677ee8',
  business3: '1ee4e871-9584-4be2-b8a7-60016c8fac78',
  business4: '2ab64364-6c09-4a06-82b5-4d68aafa64ad',
  business5: '2e13298e-02c2-42de-8e52-eb666d7d9ea3',
} as const;

export const ANALYZE_DATA = {
  // Business UUIDs (use these for row/grid targeting)
  singleBusinessUUID: BUSINESS_UUIDS.business1,
  faultToleranceUUID: BUSINESS_UUIDS.business2,

  // Legacy row ID support (kept for backwards compatibility)
  singleBusinessRowId: 1,
  faultToleranceRowId: 2,

  // Pillar Combinations
  pillarsAll:           ['gbp', 'web', 'soc'] as const,
  pillarsGbpOnly:       ['gbp'] as const,
  pillarsWebOnly:       ['web'] as const,
  pillarsWebDeadLink:   ['web'] as const,    // Used in fault tolerance tests

  // Credit Deductions
  creditsPerAnalysis:   1,
  creditsFaultTolerance: 0,                  // No credit deducted on pillar failure

  // Progress Bar States
  progressStart:        '0',
  progressComplete:     '100',

  // Status Tags
  statusTags:           ['Warm', 'Follow Up', 'Rejected', 'Sold'] as const,
  statusWarm:           'Warm',
  statusFollowUp:       'Follow Up',
  statusRejected:       'Rejected',
  statusSold:           'Sold',

  // Tooltips and Messages
  zeroBaselineTooltip:  'Initial Score Generated',

  // Trend Indicators
  trendUp:              'up',
  trendDown:            'down',

  // UI Text & Labels
  analyzeButtonText:    'Analyze',
  modalTitle:           'Analyze Business',

  // Timeouts (milliseconds)
  progressTimeout:      60_000,
  modalWaitTimeout:     5_000,

  // All business UUIDs for reference
  allBusinessUUIDs: BUSINESS_UUIDS,
} as const;

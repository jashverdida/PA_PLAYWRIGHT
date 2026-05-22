/**
 * Credit History Test Data Dictionary
 * 
 * Contains all test data for Credit History scenarios:
 * - Ledger entries (deductions and deposits)
 * - Filter tab options (All, Deposits Only, Usage Only, Request Only)
 * - Credit request presets (100, 250, 500, 1000, Custom)
 * - Status pills and UI text
 * - Color codes for deductions (red) and additions (green)
 * 
 * Usage:
 *   const { filterTabs, creditRequestPresets } = CREDIT_DATA;
 */

export const CREDIT_DATA = {
  // Filter Tabs
  filterTabs: {
    all: 'All',
    depositsOnly: 'Deposits Only',
    usageOnly: 'Usage Only',
    requestOnly: 'Request Only',
  } as const,

  // Credit Request Presets
  creditRequestPresets: [100, 250, 500, 1000] as const,
  creditRequestCustom: 'Custom',

  // Credit Amounts
  creditsPerAnalysis: 1,
  creditTopUp100: 100,
  creditTopUp250: 250,
  creditTopUp500: 500,
  creditTopUp1000: 1000,

  // Ledger Entry States
  deductionColor: 'red',    // Deductions show in red
  additionColor: 'green',   // Additions show in green

  // Status Pills
  statusApproved: 'Approved',
  statusPending: 'Pending',
  statusRejected: 'Rejected',
  
  // Formatting
  deductionPrefix: '-',
  additionPrefix: '+',
  decimalPlaces: 2,
  currencyFormat: 'USD',

  // UI Elements
  rollingBalanceLabel: 'Balance',
  amountLabel: 'Amount',
  dateLabel: 'Date',
  typeLabel: 'Type',
  statusLabel: 'Status',

  // Messages
  rejectedMessage: 'Your credit top-up request was rejected',
  approvedMessage: 'Your credit top-up was approved',
  balanceUnchangedMessage: 'Balance remained unchanged after rejection',

  // Pagination
  itemsPerPage: 10,
  maxPages: 5,

  // Type Classifications
  entryTypeAnalysis: 'Analysis',
  entryTypeDeposit: 'Deposit',
  entryTypeRequest: 'Request',
} as const;

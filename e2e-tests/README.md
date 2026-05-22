## PA Playwright - Refactored Test Suite

### New Structure Overview

This test suite has been refactored to follow best practices and Senior QA guidelines:

```
PA_Playwright/
└── e2e-tests/
    ├── playwright.config.ts           # Global Playwright configuration
    ├── tests/                         # Test execution files (*.spec.ts)
    │   ├── ui/                        # Frontend UI Tests
    │   │   ├── simple.spec.ts         # Smoke test
    │   │   ├── auth/
    │   │   │   └── login.spec.ts      # Login tests (5 scenarios)
    │   │   ├── prospecting/
    │   │   │   └── search.spec.ts     # Search tests (5 scenarios)
    │   │   ├── management/
    │   │   ├── logs/
    │   │
    │   └── api/                       # Backend API Tests
    │       ├── search-fetch.spec.ts   # Search API tests
    │       ├── credit-ledger.spec.ts  # Credit system tests
    │       └── analyze-engine.spec.ts # Analysis engine tests
    │
    ├── pages/                         # Page Object Models
    │   ├── BasePage.ts                # Shared cross-page methods
    │   ├── auth/
    │   │   ├── LoginPageLocators.ts   # Login page selectors only
    │   │   └── LoginPage.ts           # Login page methods
    │   ├── prospecting/
    │   │   ├── SearchBusinessPageLocators.ts
    │   │   ├── SearchBusinessPage.ts
    │   │   ├── AnalyzeBusinessPageLocators.ts
    │   │   ├── AnalyzeBusinessPage.ts
    │   │   └── BusinessDetailsPage.ts
    │   ├── management/
    │   │   ├── ProfilePage.ts
    │   │   ├── CreditHistoryPage.ts
    │   │   └── SettingsPage.ts
    │   └── logs/
    │       ├── AnalysisLogsPage.ts
    │       └── SearchLogsPage.ts
    │
    ├── api/                           # API Controllers/Helpers
    │   ├── BaseApi.ts                 # Shared API logic
    │   ├── ProspectApi.ts             # Search and analyze endpoints
    │   └── LedgerApi.ts               # Credit system endpoints
    │
    ├── data/                          # Test Data (TypeScript dictionaries)
    │   ├── testUsers.ts               # User profiles for different scenarios
    │   ├── searchData.ts              # Search parameters and edge cases
    │   └── mockResponses.ts           # Mock API responses
    │
    └── utils/                         # Global Helper Functions
        ├── logger.ts                  # Color-coded logging
        ├── dateHelper.ts              # Date/time utilities
        ├── mathHelper.ts              # Math operations (deduction, percentage)
        └── dbHelper.ts                # Database query helpers
```

---

## Key Features & Best Practices

### ✅ Modularized Functions
- **BasePage.ts**: Cross-page methods (`navigate_to`, `click_element`, `fill_input`, etc.)
- **Module Pages**: Feature-specific methods (LoginPage, SearchBusinessPage, etc.)
- **Test Files**: ONLY call modularized functions, NO direct actions

Example:
```typescript
// ✓ Correct: Using modularized function
await login_page.fill_login_credentials(email, password);

// ✗ Avoid: Direct page actions in tests
await page.fill('selector', 'value');
```

### ✅ Locator Organization
- **Separate Locator Files**: `LoginPageLocators.ts`, `SearchBusinessPageLocators.ts`
- **Locators Only**: Selectors/XPath only, no test data
- **Dynamic Locators**: Use templates (e.g., `.replace('{category}', category)`)

### ✅ Test Data Management
- **TypeScript Dictionaries**: `testUsers.ts`, `searchData.ts`, `mockResponses.ts`
- **Type-Safe**: Interface definitions for auto-completion
- **Helper Functions**: `get_default_user()`, `get_search_by_category()`

### ✅ AAA Test Pattern
Every test follows: **Arrange → Act → Assert**

```typescript
test('Example: PA_AUTH_001', async () => {
  // ARRANGE: Prepare data
  const test_user = TEST_USERS.ADMIN_USER;
  Logger.step(0, 'ARRANGE: Preparing test data');

  // ACT: Execute steps
  Logger.step(1, 'ACT: Executing login');
  await login_page.navigate_to_login();
  await login_page.fill_login_credentials(test_user.email, test_user.password);

  // ASSERT: Verify results
  Logger.step(2, 'ASSERT: Verifying success');
  await login_page.verify_login_success();
});
```

### ✅ Preconditions & Cleanup
- **Preconditions**: Explicit setup in `beforeEach`
- **Cleanup**: Removal of created data in `afterEach`

```typescript
test.beforeEach(async ({ page, context }) => {
  // Clear cookies for clean state
  await context.clearCookies();
  Logger.step(0, 'PRECONDITION: Logging in user');
});

test.afterEach(async () => {
  Logger.info('CLEANUP: Test completed');
});
```

### ✅ Explicit Waits
- No `sleep()` calls
- Uses `waitFor()`, `waitForNavigation()`, `waitForLoadState()`

```typescript
// ✓ Explicit wait
await this.wait_for_element_visible(selector, 5000);

// ✗ Avoid
await page.waitForTimeout(2000);
```

### ✅ Independent Tests
- Tests can run in any order
- No test-to-test dependencies
- Clear data isolation

---

## Test Coverage

### UI Tests

#### Authentication (`e2e-tests/tests/ui/auth/login.spec.ts`)
- ✓ PA_AUTH_001: Valid login redirect
- ✓ PA_AUTH_002: Form elements visible
- ✓ PA_AUTH_003: Invalid password error
- ✓ PA_AUTH_004: Login with low-credit user
- ✓ PA_AUTH_005: Empty email validation

#### Search Business (`e2e-tests/tests/ui/prospecting/search.spec.ts`)
- ✓ E2E_SEARCH_001: Form elements visible
- ✓ E2E_SEARCH_002: Valid search returns results
- ✓ E2E_SEARCH_003: Extended criteria search
- ✓ E2E_SEARCH_004: Empty category validation
- ✓ E2E_SEARCH_005: ZIP code location search

### API Tests

#### Search API (`e2e-tests/tests/api/search-fetch.spec.ts`)
- ✓ Valid search parameters
- ✓ Malformed payload rejection

#### Credit Ledger (`e2e-tests/tests/api/credit-ledger.spec.ts`)
- ✓ Get user profile and credits
- ✓ Verify ledger math accuracy
- ✓ Fetch ledger history

#### Analyze Engine (`e2e-tests/tests/api/analyze-engine.spec.ts`)
- ✓ Single business analysis
- ✓ Deduction isolation verification

---

## Code Conventions

### Naming Conventions
- **Functions**: `snake_case` (e.g., `fill_login_credentials`, `verify_results_found`)
- **Variables**: `snake_case` (e.g., `test_user`, `search_limit`, `error_message`)
- **Classes**: `PascalCase` (e.g., `LoginPage`, `SearchBusinessPage`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `LOGIN_PAGE_LOCATORS`, `TEST_USERS`)

### Documentation
- **JSDoc comments** for all modularized functions
- **Section headers** in test files (ARRANGE, ACT, ASSERT, PRECONDITION, CLEANUP)
- **Logger statements** for test flow visibility

---

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test e2e-tests/tests/ui/auth/login.spec.ts
```

### Run Tests by Pattern
```bash
npx playwright test --grep "PA_AUTH"
```

### Run with Specific Browser
```bash
npx playwright test --project=chromium
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Generate HTML Report
```bash
npx playwright show-report
```

---

## Adding New Tests

### 1. Create Test File
```typescript
// e2e-tests/tests/ui/[module]/[feature].spec.ts

import { test, expect } from '@playwright/test';
import { SomePage } from '../../../pages/[module]/SomePage';
import { Logger } from '../../../utils/logger';

test.describe('[Feature] Tests', () => {
  let page_object: SomePage;

  test.beforeEach(async ({ page }) => {
    page_object = new SomePage(page);
    Logger.step(0, 'PRECONDITION: Setup');
  });

  test('Test case name', async () => {
    // ARRANGE
    // ACT
    // ASSERT
  });
});
```

### 2. Create Page Object with Locators
```typescript
// e2e-tests/pages/[module]/SomePageLocators.ts
export const SOME_PAGE_LOCATORS = {
  // Locators only
};

// e2e-tests/pages/[module]/SomePage.ts
import { BasePage } from '../BasePage';

export class SomePage extends BasePage {
  async modularized_action() {
    // Modularized method
  }
}
```

### 3. Add Test Data
```typescript
// e2e-tests/data/someData.ts
export const SOME_DATA = {
  SCENARIO_1: { /* data */ },
};
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `BasePage.ts` | Cross-page utilities (navigate, click, wait, etc.) |
| `Logger.ts` | Color-coded logging |
| `dateHelper.ts` | Date formatting, calculations |
| `mathHelper.ts` | Percentage, deduction, average calculations |
| `dbHelper.ts` | Database query execution |
| `BaseApi.ts` | Shared API request/response logic |
| `ProspectApi.ts` | Search and analyze API wrappers |
| `LedgerApi.ts` | Credit system API wrappers |

---

## Troubleshooting

### Tests failing with timeout
- Increase timeout in `playwright.config.ts`
- Check if selectors are correct in locator files
- Use Logger statements to identify failing steps

### Preconditions not working
- Ensure `beforeEach` hook is in correct test file
- Check that context clearing works
- Verify data setup before main test

### Modularized function not found
- Check import paths
- Ensure function exists in page object class
- Check snake_case naming

---

## QA Checklist

When adding new tests, verify:

- [ ] **Locators extracted**: All selectors in separate `*Locators.ts` file
- [ ] **Test data isolated**: Uses dictionaries from `data/` folder
- [ ] **Modularized functions**: No direct page actions in tests
- [ ] **AAA pattern**: Clear Arrange/Act/Assert sections
- [ ] **Preconditions documented**: Clear prerequisites
- [ ] **Independent tests**: No test-to-test dependencies
- [ ] **Explicit waits**: No `sleep()` calls
- [ ] **Documentation**: JSDoc for functions, Logger statements
- [ ] **Naming convention**: `snake_case` for functions/variables
- [ ] **Error handling**: Proper error messages and assertions

---

## Contact & Support

For questions or issues, refer to Senior QA requirements or this documentation.

Happy testing! 🎭

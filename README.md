# Prospect Analyzer - Playwright Test Framework

A comprehensive, enterprise-grade Playwright test automation framework for the Prospect Analyzer application, following industry best practices and test automation design patterns.

## 📋 Project Structure

```
PA_Playwright/
├── e2e-tests/                         # Main test folder
│   ├── tests/                         # Test execution files (*.spec.ts)
│   │   ├── ui/                        # Frontend UI Tests
│   │   │   ├── simple.spec.ts         # Smoke test
│   │   │   ├── auth/
│   │   │   │   └── login.spec.ts      # Login tests (5 scenarios)
│   │   │   ├── prospecting/
│   │   │   │   ├── search.spec.ts     # Search tests (5 scenarios)
│   │   │   │   └── analyze.spec.ts    # Analyze tests (6 scenarios) ✅ NEW
│   │   │   ├── management/
│   │   │   │   ├── creditHistory.spec.ts  # Credit History tests (6 scenarios) ✅ NEW
│   │   │   │   └── profileSettings.spec.ts # Profile & Settings tests (7 scenarios) ✅ NEW
│   │   │   └── logs/
│   │   │       ├── analysisLogs.spec.ts     # Analysis Logs tests (6 scenarios) ✅ NEW
│   │   │       └── searchLogs.spec.ts       # Search Logs tests (6 scenarios) ✅ NEW
│   │   └── api/                       # Backend API Tests
│   │       ├── search-fetch.spec.ts
│   │       ├── credit-ledger.spec.ts
│   │       └── analyze-engine.spec.ts
│   ├── pages/                         # Page Object Models
│   │   ├── BasePage.ts                # Shared cross-page methods
│   │   ├── auth/
│   │   ├── prospecting/
│   │   ├── management/
│   │   └── logs/
│   ├── api/                           # API Controllers
│   │   ├── BaseApi.ts
│   │   ├── ProspectApi.ts
│   │   └── LedgerApi.ts
│   ├── data/                          # Test Data (TypeScript)
│   │   ├── testUsers.ts
│   │   ├── searchData.ts
│   │   ├── analyzeData.ts             # Analyze Business test data ✅ NEW
│   │   ├── creditData.ts              # Credit History test data ✅ NEW
│   │   ├── logsData.ts                # Logs test data ✅ NEW
│   │   └── mockResponses.ts
│   ├── utils/                         # Helper Functions
│   │   ├── logger.ts
│   │   ├── dateHelper.ts
│   │   ├── mathHelper.ts
│   │   └── dbHelper.ts
│   └── fixtures/                      # Test Fixtures ✅ NEW
│       └── auth.fixture.ts            # Authenticated page fixture
├── config/                            # Configuration files
│   ├── env/
│   ├── global-setup.ts
│   └── global-teardown.ts
├── .auth/                             # Cached authentication state
├── reports/                           # Test reports & artifacts
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json
├── package.json
└── .env
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm 7+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PA_Playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   # Copy the .env file and update with your credentials
   cp .env .env.local
   # Edit .env.local with your test account credentials
   ```

## 📝 Configuration

### Environment Setup

Select your test environment by setting the `ENV` variable:

```bash
# Development (default)
ENV=dev npx playwright test

# QA Environment
ENV=qa npx playwright test

# Production
ENV=prod npx playwright test
```

### Test Credentials

Update your `.env` file with valid test account credentials:

```env
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run specific test file
```bash
npx playwright test e2e-tests/tests/ui/auth/login.spec.ts
```

### Run tests with UI mode (interactive)
```bash
npx playwright test --ui
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with headed browser (see browser)
```bash
npx playwright test --headed
```

## 📊 Test Reports

After running tests, reports are generated in the `reports/` directory:

- **HTML Report**: `reports/html/index.html` (interactive)
- **JSON Report**: `reports/test-results.json`
- **JUnit XML**: `reports/test-results.xml`

View the HTML report:
```bash
npx playwright show-report
```

## ✅ Newly Implemented Modules (Following Automation Standards)

The following test modules have been fully implemented following the **Prospect Analyzer Automation Testing Standards & Guide**:

### Test Suites Implemented
| Module | Tests | File | Data File |
|--------|-------|------|-----------|
| **Analyze Business** | 6 test cases | `tests/ui/prospecting/analyze.spec.ts` | `data/analyzeData.ts` |
| **Credit History** | 6 test cases | `tests/ui/management/creditHistory.spec.ts` | `data/creditData.ts` |
| **Profile & Settings** | 7 test cases | `tests/ui/management/profileSettings.spec.ts` | `data/logsData.ts` |
| **Analysis Logs** | 6 test cases | `tests/ui/logs/analysisLogs.spec.ts` | `data/logsData.ts` |
| **Search Logs** | 6 test cases | `tests/ui/logs/searchLogs.spec.ts` | `data/logsData.ts` |

### Authentication Fixture
- **auth.fixture.ts** — Authenticated page fixture with cached session state

### Key Features of Implementation
✅ **AAA Pattern** — Arrange, Act, Assert structure in every test  
✅ **Page Object Model** — All locators and actions encapsulated in page objects  
✅ **Centralized Test Data** — TypeScript dictionaries with `as const` for type safety  
✅ **Modularized Methods** — No raw `page.locator()` or `page.click()` in test files  
✅ **Comprehensive Logging** — Logger integration for test traceability  
✅ **JSDoc Comments** — Every method documented with purpose and parameters  
✅ **Descriptive Assertions** — Failure messages explain what went wrong  
✅ **Explicit Waits** — Event-driven waits, never `waitForTimeout()`  

### Run the New Tests
```bash
# Run all newly implemented tests
npm test

# Run specific module tests
npx playwright test e2e-tests/tests/ui/prospecting/analyze.spec.ts
npx playwright test e2e-tests/tests/ui/management/creditHistory.spec.ts
npx playwright test e2e-tests/tests/ui/management/profileSettings.spec.ts
npx playwright test e2e-tests/tests/ui/logs/analysisLogs.spec.ts
npx playwright test e2e-tests/tests/ui/logs/searchLogs.spec.ts
```

## 🔍 Code Organization

### Page Objects (`pages/`)

Encapsulates all element locators and page interactions:

```typescript
// Example: loginPage.ts
export class LoginPage {
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

**Benefits:**
- Centralized locator management
- Easy maintenance when UI changes
- Reusable across multiple tests

### Fixtures (`fixtures/`)

Custom test fixtures for setup/teardown and shared resources:

```typescript
// Example: auth.fixture.ts
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    await loginPage.login(email, password);
    await use(page);
    // Teardown: Cleanup after test
  },
});
```

### Utilities (`utils/`)

Common helper functions and utilities:

- **Logger.ts**: Structured logging with color output
- **helpers.ts**: Retry logic, waits, screenshots, etc.

### Test Data (`data/`)

Centralized test data management:

- **users.json**: Test user credentials
- **testData.json**: Test scenarios, URLs, timeouts

### Global Setup/Teardown (`config/`)

Runs once per test session:

- **global-setup.ts**: Performs initial authentication
- **global-teardown.ts**: Cleanup after all tests

## 🛠️ Best Practices

### 1. Use Page Objects
Always encapsulate UI interactions in Page Objects:
```typescript
const searchPage = new SearchBusinessPage(page);
await searchPage.navigateToSearchBusiness();
```

### 2. Centralized Test Data
Use JSON files for test data instead of hardcoding:
```typescript
import testData from '../data/testData.json';
const criteria = testData.searchCriteria.testCase_001;
```

### 3. Meaningful Test Names
Use descriptive test names following pattern: `PA_FEATURE_NUMBER: Description`
```typescript
test('PA_SEARCH_001: Verify results are filtered correctly using valid inputs')
```

### 4. Use Logger for Debugging
```typescript
import { Logger } from '../utils/logger';
Logger.step(1, 'Navigating to search page');
Logger.success('Search completed');
```

### 5. Handle Waits Properly
Use the helpers for common wait scenarios:
```typescript
await TestHelpers.waitForNetworkIdle(page);
await TestHelpers.retry(() => searchPage.performSearch());
```

## 🔐 Authentication

The framework uses global authentication with state caching:

1. **First Run**: Global setup authenticates and saves state to `.auth/user.json`
2. **Subsequent Runs**: Tests reuse cached authentication state
3. **Cache Invalidation**: Delete `.auth/user.json` to force re-authentication

## 📦 Dependencies

- **@playwright/test**: ^1.58.2 - Core testing framework
- **dotenv**: Environment variable management
- **TypeScript**: Type-safe development

## 🚦 CI/CD Integration

Tests run automatically via GitHub Actions on:
- Push to main/develop branches
- Pull requests
- Daily schedule (2 AM UTC)

View workflow: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

Required GitHub Secrets:
- `TEST_EMAIL`: Test account email
- `TEST_PASSWORD`: Test account password

## 🐛 Troubleshooting

### Tests fail with "Authentication failed"
- Verify `.env` file has valid credentials
- Delete `.auth/user.json` to force re-authentication
- Check if test account is still active

### Timeout errors
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify test environment is accessible

### Element not found
- Update selectors in Page Objects if UI changed
- Use `npx playwright test --debug` for interactive debugging
- Check if page has fully loaded: use `waitForLoadState('networkidle')`

### Screenshots/Traces not generated
- Check `reports/` directory permissions
- Ensure reports directory exists
- Screenshots are only saved on failure by default

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 👥 Contributing

When adding new tests:
1. Follow the existing folder structure
2. Use Page Object Model pattern
3. Centralize test data in `data/` folder
4. Update this README with new test descriptions
5. Ensure all tests pass locally before committing

## 📄 License

[Add your license information here]

---

**Last Updated**: May 2026  
**Framework Version**: 1.0.0  
**Playwright Version**: ^1.58.2

# QA Automation Take-Home — Login flow

Playwright (JavaScript) UI automation for the **form authentication** user flow on [the-internet.herokuapp.com](https://the-internet.herokuapp.com/login).

Structured after the same Page Object + flow-helper pattern used in the Velozient project, simplified for this assignment.

## Submission checklist

| Deliverable | Location |
|-------------|----------|
| Test case document (meaningful user flow, structured cases) | [`TEST_CASES.md`](./TEST_CASES.md) |
| Automated tests (5 cases from `TEST_CASES.md`) | [`tests/e2e/login.spec.js`](./tests/e2e/login.spec.js) |
| How to run + project overview | This README |

## User flow under test

**Login → secure area → logout**

1. Guest opens the login form.
2. Submits credentials (valid or invalid).
3. On success, lands on `/secure` and can log out.
4. On failure, stays on `/login` with a flash error message.

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| [Node.js](https://nodejs.org/) | 18+ recommended |
| npm | Bundled with Node.js |
| Network | Outbound HTTPS to `https://the-internet.herokuapp.com` |

## Setup

```bash
npm install
npx playwright install chromium
```

Optional: copy `.env.example` to `.env` to override `BASE_URL`.

## Run tests

```bash
npm run test:e2e
```

| Command | Purpose |
|---------|---------|
| `npm run test:e2e:headed` | Run with visible browser |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run test:e2e:report` | Open last HTML report |

### Environment

- **Default base URL:** `https://the-internet.herokuapp.com` (`playwright.config.js`)
- **Override:** set `BASE_URL` in `.env` or the shell environment

```bash
set BASE_URL=https://the-internet.herokuapp.com
npm run test:e2e
```

On CI, set `CI=true` to enable retries and `forbidOnly` (same pattern as Velozient).

## Project layout

| Path | Purpose |
|------|---------|
| `TEST_CASES.md` | Manual test case documentation |
| `tests/e2e/` | Playwright specs |
| `tests/utilities/` | Custom test fixture + `LoginFlow` helper |
| `pages/` | Page objects (`LoginPage`, `SecureAreaPage`) |
| `fixtures/` | Test data (credentials, expected messages) |
| `shared/` | Shared selectors |
| `reports/` | Generated HTML report and artifacts (gitignored) |

## Design notes

- **Page objects** encapsulate locators and page actions (`pages/`).
- **`LoginFlow`** composes page objects into reusable journey steps (`tests/utilities/login-flow.js`).
- **Custom fixture** (`tests/utilities/test.js`) injects `loginFlow` into specs, similar to the Velozient `I` DSL but kept minimal for JavaScript.
- **Selectors** live in one place (`shared/selectors.js`) to ease maintenance.

## Test credentials

The demo site documents a single valid account:

- Username: `tomsmith`
- Password: `SuperSecretPassword!`

These are stored in `fixtures/credentials.js` and referenced by both manual and automated tests.

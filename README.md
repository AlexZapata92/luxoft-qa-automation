# QA Automation — Login Flow

End-to-end UI automation for the **form authentication** user flow on [the-internet.herokuapp.com](https://the-internet.herokuapp.com/login).

Built with CodeceptJS on Playwright using page objects, dependency injection, and structured scenarios.

## Deliverables

| Item | Location |
|------|----------|
| Test case document | [`TEST_CASES.md`](./TEST_CASES.md) |
| Automated tests (5 cases) | [`tests/e2e/login_test.js`](./tests/e2e/login_test.js) |
| Setup and execution guide | This README |

## User flow under test

**Login → secure area → logout**

1. Open the login form.
2. Submit credentials (valid or invalid).
3. On success, reach `/secure` and log out.
4. On failure, remain on `/login` with a flash error message.

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
| `npm run test:e2e:verbose` | Verbose CodeceptJS output |

### Environment

- **Default base URL:** `https://the-internet.herokuapp.com` (`codecept.conf.js`)
- **Override:** set `BASE_URL` in `.env` or the shell environment

```bash
set BASE_URL=https://the-internet.herokuapp.com
npm run test:e2e
```

## Project layout

| Path | Purpose |
|------|---------|
| `TEST_CASES.md` | Manual test case documentation |
| `tests/e2e/` | CodeceptJS scenarios (`*_test.js`) |
| `pages/` | Page objects |
| `steps_file.js` | Custom `I` actor steps |
| `fixtures/` | JSON test data and loader |
| `shared/` | Shared selectors |
| `codecept.conf.js` | CodeceptJS and Playwright helper configuration |
| `reports/` | Failure screenshots and artifacts (gitignored) |

## Architecture

- **Playwright** drives the browser; **CodeceptJS** provides the scenario layer.
- Page objects use `const { I } = inject();` with methods such as `I.fillField` and `I.see`.
- Scenarios declare dependencies via `const { I, loginPage, secureAreaPage, data } = inject();`.
- Step labels use `I.say('...')` for readable execution output.
- Page objects and data modules are registered in `codecept.conf.js` under `include`.

## Test data and credentials

Credentials for the-internet.herokuapp.com are documented on the login page and stored in `fixtures/login-test-data.json`.

For non-public credentials, use environment variables (`.env`, gitignored) or CI secrets rather than committed files.

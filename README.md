# QA Automation — Login Flow

End-to-end UI automation for the **form authentication** user flow on [the-internet.herokuapp.com](https://the-internet.herokuapp.com/login).

Built with CodeceptJS on Playwright using page objects, dependency injection, and structured scenarios.

## Framework choice

**CodeceptJS** was selected as a scenario layer on top of **Playwright** to improve readability for non-technical reviewers. Scenarios read in plain language (`Feature`, `Scenario`, `I.say`, page object methods), while Playwright continues to handle browser execution under the hood.

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
| `helpers/` | Support modules (e.g. mock teardown helpers) |
| `shared/` | Shared selectors |
| `codecept.conf.js` | CodeceptJS and Playwright helper configuration |
| `.github/workflows/` | GitHub Actions E2E workflow (manual trigger) |
| `reports/` | Codecept artifacts, Allure results, and HTML report (gitignored) |

## Reporting (Allure)

Tests write raw Allure results to `reports/allure/results`. Generate or serve the HTML report after a run:

| Command | Purpose |
|---------|---------|
| `npm run report:allure:serve` | Serve interactive report from latest results |
| `npm run report:allure:generate` | Build static report under `reports/allure/report` |
| `npm run report:allure:open` | Open generated static report |
| `npm run allure:clean-results` | Clear raw results (runs automatically before `test:e2e*`) |

Typical workflow:

```bash
npm run test:e2e
npm run report:allure:serve
```

## Architecture

- **Playwright** drives the browser; **CodeceptJS** provides the scenario layer.
- Page objects use `const { I } = inject();` with methods such as `I.fillField` and `I.see`.
- Scenarios declare dependencies via `const { I, loginPage, secureAreaPage, data } = inject();`.
- Step labels use `I.say('...')` for readable execution output.
- Page objects and data modules are registered in `codecept.conf.js` under `include`.

## Test data and credentials

Credentials for the-internet.herokuapp.com are documented on the login page and stored in `fixtures/login-test-data.json`.

For non-public credentials, use environment variables (`.env`, gitignored) or CI secrets rather than committed files.

## Continuous integration

A GitHub Actions workflow is included at [`.github/workflows/e2e.yml`](./.github/workflows/e2e.yml).

| Mode | How to run |
|------|------------|
| **GitHub Actions (manual)** | Repository → **Actions** → **E2E** → **Run workflow** |
| **Local CI mirror** | `npm run test:ci` (Windows: `npm run test:ci:local`) |

The workflow uses `workflow_dispatch` only so it does not consume Actions minutes on every push. To run automatically on `main`, uncomment the `push` / `pull_request` triggers in the workflow file.

The local scripts in `scripts/run-ci-local.ps1` and `scripts/run-ci-local.sh` mirror the CI steps: `npm ci`, browser install, test execution, and Allure report generation.

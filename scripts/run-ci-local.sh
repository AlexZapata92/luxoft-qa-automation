#!/usr/bin/env bash
set -euo pipefail

echo "==> Installing dependencies"
npm ci

echo "==> Installing Playwright Chromium"
npx playwright install --with-deps chromium

echo "==> Running E2E tests (CI mode)"
CI=true BASE_URL="${BASE_URL:-https://the-internet.herokuapp.com}" npm run test:e2e

echo "==> Generating Allure report"
npm run report:allure:generate

echo "==> CI run complete"

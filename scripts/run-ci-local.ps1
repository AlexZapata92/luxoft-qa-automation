$ErrorActionPreference = "Stop"

Write-Host "==> Installing dependencies"
npm ci

Write-Host "==> Installing Playwright Chromium"
npx playwright install chromium

Write-Host "==> Running E2E tests (CI mode)"
$env:CI = "true"
if (-not $env:BASE_URL) {
  $env:BASE_URL = "https://the-internet.herokuapp.com"
}
npm run test:e2e

Write-Host "==> Generating Allure report"
npm run report:allure:generate

Write-Host "==> CI run complete"

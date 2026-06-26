require('dotenv/config');
const { defineConfig, devices } = require('@playwright/test');

const baseURL =
  process.env.BASE_URL ?? 'https://the-internet.herokuapp.com';

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  outputDir: 'reports/playwright/test-results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/playwright/html' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 45_000,
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

require('dotenv/config');

const os = require('node:os');

const baseURL = process.env.BASE_URL || 'https://the-internet.herokuapp.com';

exports.config = {
  tests: './tests/e2e/**/*_test.js',
  output: './reports/codecept/output',
  helpers: {
    Playwright: {
      url: baseURL,
      browser: 'chromium',
      show: process.env.HEADED === 'true',
      waitForTimeout: 15_000,
    },
  },
  include: {
    I: './steps_file.js',
    loginPage: './pages/LoginPage.js',
    secureAreaPage: './pages/SecureAreaPage.js',
    data: './fixtures/load-test-data.js',
    teardownHelper: './helpers/teardownHelper.js',
  },
  plugins: {
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      resultsDir: 'reports/allure/results',
      environmentInfo: {
        app_url: baseURL,
        browser: 'chromium',
        node_version: process.version,
        os_platform: os.platform(),
        os_release: os.release(),
      },
    },
  },
  name: 'luxoft-qa-automation',
};

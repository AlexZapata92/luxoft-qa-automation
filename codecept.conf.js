require('dotenv/config');

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
  },
  name: 'luxoft-qa-automation',
};

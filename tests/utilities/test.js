const { test: base, expect } = require('@playwright/test');
const { LoginFlow } = require('../utilities/login-flow');

const test = base.extend({
  loginFlow: async ({ page }, use) => {
    await use(new LoginFlow(page));
  },
});

module.exports = { test, expect };

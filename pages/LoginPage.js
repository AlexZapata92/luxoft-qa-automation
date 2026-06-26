const sel = require('../shared/selectors');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(sel.login.username);
    this.passwordInput = page.locator(sel.login.password);
    this.submitButton = page.locator(sel.login.submitButton);
    this.flashMessage = page.locator(sel.login.flashMessage);
  }

  async goto() {
    await this.page.goto(sel.login.path);
  }

  /**
   * @param {{ username: string; password: string }} credentials
   */
  async login(credentials) {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }

  async expectFlashContains(text) {
    await this.flashMessage.waitFor({ state: 'visible' });
    await this.page.getByText(text, { exact: false }).waitFor({ state: 'visible' });
  }
}

module.exports = { LoginPage };

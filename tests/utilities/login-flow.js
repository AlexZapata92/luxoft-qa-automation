const { LoginPage } = require('../../pages/LoginPage');
const { SecureAreaPage } = require('../../pages/SecureAreaPage');

/**
 * High-level steps for the login user flow (reusable across specs).
 */
class LoginFlow {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.secureAreaPage = new SecureAreaPage(page);
  }

  async openLoginPage() {
    await this.loginPage.goto();
  }

  /**
   * @param {{ username: string; password: string }} credentials
   */
  async submitLogin(credentials) {
    await this.loginPage.login(credentials);
  }

  async expectSuccessfulLogin() {
    await this.secureAreaPage.expectLoaded();
    await this.secureAreaPage.expectWelcomeMessage();
  }

  async expectLoginError(message) {
    await this.loginPage.expectFlashContains(message);
  }

  async logoutFromSecureArea() {
    await this.secureAreaPage.logout();
  }
}

module.exports = { LoginFlow };

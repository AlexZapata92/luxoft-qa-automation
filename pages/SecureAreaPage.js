const sel = require('../shared/selectors');

class SecureAreaPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.locator(sel.secureArea.heading);
    this.logoutLink = page.locator(sel.secureArea.logoutLink);
  }

  async expectLoaded() {
    await this.page.waitForURL(`**${sel.secureArea.path}`);
    await this.heading.waitFor({ state: 'visible' });
  }

  async expectWelcomeMessage() {
    await this.page
      .getByText('Welcome to the Secure Area. When you are done click logout below.')
      .waitFor({ state: 'visible' });
    await this.page.getByText('You logged into a secure area!', { exact: false }).waitFor({
      state: 'visible',
    });
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { SecureAreaPage };

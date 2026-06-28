const { I } = inject();
const sel = require('../shared/selectors');

module.exports = {
  links: {
    logout: sel.secureArea.logoutLink,
  },

  seeSecureArea() {
    I.seeInCurrentUrl(sel.secureArea.path);
    I.see('Welcome to the Secure Area. When you are done click logout below.');
    I.see('You logged into a secure area!');
  },

  logout() {
    I.click(this.links.logout);
  },
};

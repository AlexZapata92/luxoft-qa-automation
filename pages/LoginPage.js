const { I } = inject();
const sel = require('../shared/selectors');

module.exports = {
  fields: {
    username: sel.login.username,
    password: sel.login.password,
  },
  buttons: {
    submit: sel.login.submitButton,
  },

  open() {
    I.amOnPage(sel.login.path);
  },

  login(credentials) {
    I.fillField(this.fields.username, credentials.username);
    I.fillField(this.fields.password, credentials.password);
    I.click(this.buttons.submit);
  },

  seeFlashMessage(text) {
    I.see(text, sel.login.flashMessage);
  },
};

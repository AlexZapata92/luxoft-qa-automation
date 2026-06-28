Feature('Login flow - Form authentication (the-internet.herokuapp.com)');

const { I, loginPage, secureAreaPage, data } = inject();

Before(async () => {
  loginPage.open();
});

Scenario(
  'TC-POS-01 — valid credentials redirect to secure area with success message @TC-POS-01',
  async ({ I }) => {
    I.say('SUBMIT VALID CREDENTIALS');
      loginPage.login(data.validUser);

    I.say('VERIFY USER LANDS ON SECURE AREA');
      secureAreaPage.seeSecureArea();
  }
).tag('@smoke');

Scenario('TC-NEG-01 — invalid username shows validation flash message @TC-NEG-01', async ({ I }) => {
  I.say('SUBMIT INVALID USERNAME');
    loginPage.login(data.invalidUsernameUser);

  I.say('VERIFY ERROR MESSAGE ON LOGIN PAGE');
    loginPage.seeFlashMessage(data.flashMessages.invalidUsername);
});

Scenario('TC-NEG-02 — invalid password shows validation flash message @TC-NEG-02', async ({ I }) => {
  I.say('SUBMIT INVALID PASSWORD');
    loginPage.login(data.invalidPasswordUser);

  I.say('VERIFY ERROR MESSAGE ON LOGIN PAGE');
    loginPage.seeFlashMessage(data.flashMessages.invalidPassword);
});

Scenario('TC-NEG-03 — empty credentials show username validation error @TC-NEG-03', async ({ I }) => {
  I.say('SUBMIT EMPTY CREDENTIALS');
    loginPage.login(data.emptyCredentials);

  I.say('VERIFY ERROR MESSAGE ON LOGIN PAGE');
    loginPage.seeFlashMessage(data.flashMessages.missingUsername);
});

Scenario('TC-POS-02 — logout returns to login with confirmation message @TC-POS-02', async ({ I }) => {
  I.say('LOG IN WITH VALID CREDENTIALS');
    loginPage.login(data.validUser);
    secureAreaPage.seeSecureArea();

  I.say('LOG OUT FROM SECURE AREA');
    secureAreaPage.logout();

  I.say('VERIFY REDIRECT TO LOGIN WITH CONFIRMATION');
    I.seeInCurrentUrl('/login');
    loginPage.seeFlashMessage(data.flashMessages.logoutSuccess);
}).tag('@smoke');

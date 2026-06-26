const {
  validUser,
  invalidUsernameUser,
  invalidPasswordUser,
  emptyCredentials,
  flashMessages,
} = require('../../fixtures/credentials');
const { test, expect } = require('../utilities/test');

test.describe('Form authentication — login flow (the-internet.herokuapp.com)', () => {
  test.beforeEach(async ({ loginFlow }) => {
    await loginFlow.openLoginPage();
  });

  test('TC-POS-01 — valid credentials redirect to secure area with success message', async ({
    page,
    loginFlow,
  }) => {
    await loginFlow.submitLogin(validUser);

    await test.step('User lands on secure area', async () => {
      await loginFlow.expectSuccessfulLogin();
      await expect(page).toHaveURL(/\/secure$/);
    });
  });

  test('TC-NEG-01 — invalid username shows validation flash message', async ({ loginFlow }) => {
    await loginFlow.submitLogin(invalidUsernameUser);

    await test.step('Error message is displayed on login page', async () => {
      await loginFlow.expectLoginError(flashMessages.invalidUsername);
    });
  });

  test('TC-NEG-02 — invalid password shows validation flash message', async ({ loginFlow }) => {
    await loginFlow.submitLogin(invalidPasswordUser);

    await test.step('Error message is displayed on login page', async () => {
      await loginFlow.expectLoginError(flashMessages.invalidPassword);
    });
  });

  test('TC-NEG-03 — empty credentials show username validation error', async ({ loginFlow }) => {
    await loginFlow.submitLogin(emptyCredentials);

    await test.step('Error message is displayed on login page', async () => {
      await loginFlow.expectLoginError(flashMessages.missingUsername);
    });
  });

  test('TC-POS-02 — logout returns to login with confirmation message', async ({
    page,
    loginFlow,
  }) => {
    await loginFlow.submitLogin(validUser);
    await loginFlow.expectSuccessfulLogin();

    await test.step('Logout and verify redirect', async () => {
      await loginFlow.logoutFromSecureArea();
      await expect(page).toHaveURL(/\/login$/);
      await loginFlow.expectLoginError(flashMessages.logoutSuccess);
    });
  });
});

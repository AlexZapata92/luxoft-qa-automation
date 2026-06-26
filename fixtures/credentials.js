/**
 * Test data for form authentication on the-internet.herokuapp.com.
 */
const validUser = {
  username: 'tomsmith',
  password: 'SuperSecretPassword!',
};

const invalidUsernameUser = {
  username: 'invalid_user',
  password: validUser.password,
};

const invalidPasswordUser = {
  username: validUser.username,
  password: 'wrong-password',
};

const emptyCredentials = {
  username: '',
  password: '',
};

module.exports = {
  validUser,
  invalidUsernameUser,
  invalidPasswordUser,
  emptyCredentials,
  flashMessages: {
    loginSuccess: 'You logged into a secure area!',
    logoutSuccess: 'You logged out of the secure area!',
    invalidUsername: 'Your username is invalid!',
    invalidPassword: 'Your password is invalid!',
    missingUsername: 'Your username is invalid!',
  },
};

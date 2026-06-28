const loginTestData = require('./login-test-data.json');

const { valid: validUser, invalidUsername, invalidPassword, empty } = loginTestData.users;

module.exports = {
  validUser,
  invalidUsernameUser: {
    username: invalidUsername.username,
    password: validUser.password,
  },
  invalidPasswordUser: {
    username: validUser.username,
    password: invalidPassword.password,
  },
  emptyCredentials: empty,
  flashMessages: loginTestData.flashMessages,
};

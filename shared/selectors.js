/**
 * Shared selectors for the-internet.herokuapp.com login flow.
 */
module.exports = {
  login: {
    path: '/login',
    username: '#username',
    password: '#password',
    submitButton: 'button[type="submit"]',
    flashMessage: '#flash',
  },
  secureArea: {
    path: '/secure',
    heading: '.subheader',
    logoutLink: 'a[href="/logout"]',
  },
};

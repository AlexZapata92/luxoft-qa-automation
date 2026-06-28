# Test cases — form authentication (the-internet.herokuapp.com)

**Application under test:** [https://the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login)  
**Scope:** Critical user flow for authenticating via the public login form and accessing the secure area.

**User flow:** A visitor opens the login page, submits credentials, and either reaches the secure area or sees a flash error message.

---

## TC-POS-01 — Successful login with valid credentials (positive)

| Field | Description |
|--------|-------------|
| **Objective** | Verify a user can log in with valid credentials and access the secure area. |
| **Priority** | P0 |
| **Preconditions** | Browser with JavaScript enabled; demo site reachable. No prior session. |
| **Test data** | Username: `tomsmith`. Password: `SuperSecretPassword!`. |

### Steps

1. Open `/login`.
2. Enter the username and password.
3. Click **Login**.

### Expected results

- Browser navigates to `/secure`.
- Page shows welcome text for the secure area and a success flash message.

### Automated?

Yes — `tests/e2e/login_test.js` (TC-POS-01).

---

## TC-NEG-01 — Invalid username (negative)

| Field | Description |
|--------|-------------|
| **Objective** | Verify login is rejected when the username is not recognized. |
| **Priority** | P1 |
| **Preconditions** | User is on the login page. |
| **Test data** | Username: `invalid_user`. Password: `SuperSecretPassword!` (valid password). |

### Steps

1. Open `/login`.
2. Enter invalid username and valid password.
3. Click **Login**.

### Expected results

- User remains on `/login`.
- Flash message contains **Your username is invalid!**
- Secure area is not shown.

### Automated?

Yes — `tests/e2e/login_test.js` (TC-NEG-01).

---

## TC-NEG-02 — Invalid password (negative)

| Field | Description |
|--------|-------------|
| **Objective** | Verify login is rejected when the password does not match the username. |
| **Priority** | P1 |
| **Preconditions** | User is on the login page. |
| **Test data** | Username: `tomsmith`. Password: `wrong-password`. |

### Steps

1. Open `/login`.
2. Enter valid username and invalid password.
3. Click **Login**.

### Expected results

- User remains on `/login`.
- Flash message contains **Your password is invalid!**
- Secure area is not shown.

### Automated?

Yes — `tests/e2e/login_test.js` (TC-NEG-02).

---

## TC-NEG-03 — Empty credentials (negative)

| Field | Description |
|--------|-------------|
| **Objective** | Verify the form rejects submission when required fields are empty. |
| **Priority** | P2 |
| **Preconditions** | User is on the login page. |
| **Test data** | Username: *(empty)*. Password: *(empty)*. |

### Steps

1. Open `/login`.
2. Leave username and password blank.
3. Click **Login**.

### Expected results

- User remains on `/login`.
- Flash message indicates invalid username (same message as unknown user).
- Secure area is not shown.

### Automated?

Yes — `tests/e2e/login_test.js` (TC-NEG-03).

---

## TC-POS-02 — Logout from secure area (positive)

| Field | Description |
|--------|-------------|
| **Objective** | Verify an authenticated user can log out and return to the login page. |
| **Priority** | P1 |
| **Preconditions** | User has successfully logged in (TC-POS-01). |
| **Test data** | Same valid credentials as TC-POS-01. |

### Steps

1. Log in with valid credentials.
2. On the secure area page, click **Logout**.

### Expected results

- Browser navigates to `/login`.
- Flash message contains **You logged out of the secure area!**

### Automated?

Yes — `tests/e2e/login_test.js` (TC-POS-02).

---

## Traceability

| ID | Type | Automated |
|----|------|-----------|
| TC-POS-01 | Positive / critical path | Yes (Playwright) |
| TC-NEG-01 | Negative / invalid username | Yes (Playwright) |
| TC-NEG-02 | Negative / invalid password | Yes (Playwright) |
| TC-NEG-03 | Negative / empty form | Yes (Playwright) |
| TC-POS-02 | Positive / logout | Yes (Playwright) |

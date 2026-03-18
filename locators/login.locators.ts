import { type Page } from '@playwright/test';

export function getLoginLocators(page: Page) {
  return {
    emailInput: page.getByLabel('Email address'),
    passwordInput: page.getByLabel('Password'),
    signinButton: page.getByRole('button', { name: /Sign in/ }),
    loginButton: page.getByRole('button', { name: /Log In/ }),
    createaccountButton: page.getByRole('button', { name: /Create account/ }),
    errorMessage: page.getByRole('alert').or(page.locator('[data-testid="error"]')),
  };
}

export type LoginLocators = ReturnType<typeof getLoginLocators>;

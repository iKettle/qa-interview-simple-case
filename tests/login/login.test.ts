import { test, expect } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup';
import { LoginPage } from './LoginPage';
import { User } from '../../src/App';

const existingUser = existingUsers[0];
let loginPage: LoginPage;

test.describe('login form tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  })

  test('log in with existing account', async ({ page }) => {
    await loginPage.loginUser(existingUser);

    await expect(page.getByText(`Welcome ${existingUser.firstName} ${existingUser.lastName}`)).toBeVisible();
    await expect(page.getByRole('button').getByText('Log out')).toBeVisible();
  })

  test('log in with invalid credentials', async ({ page }) => {
    const invalidUserCreds: User = { email: 'testemail@test.com', password: 'testpassword', firstName: '', lastName: '' }

    await loginPage.loginUser(invalidUserCreds);

    await expect(loginPage.getInvalidCredentialsMessage).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  })

})

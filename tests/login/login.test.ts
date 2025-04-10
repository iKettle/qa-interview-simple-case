import { test, expect } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup';
import { LoginPage } from './LoginPage';

const existingUser = existingUsers[0];
let  loginPage:LoginPage;

test.describe('login form tests', () => {
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  })

  test('logging in with existing account', async ({ page }) => {
    await loginPage.inputEmail(existingUser.email);
    await loginPage.inputPassword(existingUser.password);
    await loginPage.clickLogin();

    await expect(page.getByText(`Welcome ${existingUser.firstName} ${existingUser.lastName}`)).toBeVisible();
    await expect(page.getByRole('button').getByText('Log out')).toBeVisible();
  })

  test('logging in with invalid credentials', async ({ page }) => {
    await loginPage.inputEmail('testemail@test.com');
    await loginPage.inputPassword('testpassword');
    await loginPage.clickLogin();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  })

})

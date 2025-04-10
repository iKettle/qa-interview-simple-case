import { test, expect, Page } from '@playwright/test';
import { SignupPage } from './SignupPage';
import { AccountPage } from '../account/AccountPage';
import { existingUsers } from '../../test-setup/localstorage.setup';
import { LoginPage } from '../login/LoginPage';

const existingUser = existingUsers[0];
const newUser = {
  email: 'newtest1@mail.com',
  password: 'newTestPassword!',
  firstName: 'NewTest1',
  lastName: 'NewTestsson1',
}
let signupPage: SignupPage;
let accountPage: AccountPage;

test.describe('Sign up page ', () => {
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    accountPage = new AccountPage(page);
    await signupPage.goto();
  })

  test.afterEach(async () => {
    //Here should be code that removes newly created users from db
  })

  test('register a new user', async ({ }) => {
    await signupPage.inputFirstName(newUser.firstName);
    await signupPage.inputLastName(newUser.lastName);
    await signupPage.inputEmail(newUser.email);
    await signupPage.inputPassword(newUser.password);
    await signupPage.clickSubmit();

    await expect(await accountPage.getWelcomeText()).toBeVisible();
    await expect(await accountPage.getWelcomeText()).toHaveText(`Welcome ${newUser.firstName} ${newUser.lastName}`);
    await expect(await accountPage.getLogoutButton()).toBeVisible();
  })

  test('register a new user and login with it', async ({ page }) => {
    await signupPage.inputFirstName(newUser.firstName);
    await signupPage.inputLastName(newUser.lastName);
    await signupPage.inputEmail(newUser.email);
    await signupPage.inputPassword(newUser.password);
    await signupPage.clickSubmit();

    await expect(await accountPage.getWelcomeText()).toBeVisible();
    await expect(await accountPage.getWelcomeText()).toHaveText(`Welcome ${newUser.firstName} ${newUser.lastName}`);
    await (await accountPage.getLogoutButton()).click();

    const loginPage = new LoginPage(page);
    await loginPage.inputEmail(newUser.email);
    await loginPage.inputPassword(newUser.password);
    await loginPage.clickLogin();

    await expect(await accountPage.getWelcomeText()).toBeVisible();
    await expect(await accountPage.getWelcomeText()).toHaveText(`Welcome ${newUser.firstName} ${newUser.lastName}`);
  })

  test('signup with existing user', {
    annotation: {
      type: 'issue',
      description: 'A ticket should be raised for showing error message when existing user trying to signup',
    }
  }, async ({ page }) => {
    await signupPage.inputFirstName(existingUser.firstName);
    await signupPage.inputLastName(existingUser.lastName);
    await signupPage.inputEmail(existingUser.email);
    await signupPage.inputPassword(existingUser.password);

    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await signupPage.clickSubmit();

    //Here should be proper assertions after implementation of error message
    expect(logs).toContain('User already exists');
  })

  test('handling too short password', async ({ }) => {
    await signupPage.inputFirstName(newUser.firstName);
    await signupPage.inputLastName(newUser.lastName);
    await signupPage.inputEmail(newUser.email);
    await signupPage.inputPassword('12345678');

    await expect(signupPage.submitButton).toBeDisabled();
  })

})

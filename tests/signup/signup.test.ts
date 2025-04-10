import { test, expect, Page } from '@playwright/test';
import { SignupPage } from './SignupPage';
import { AccountPage } from '../account/AccountPage';
import { existingUsers } from '../../test-setup/localstorage.setup';
import { LoginPage } from '../login/LoginPage';
import { User } from '../../src/App';
import { getNewUser } from '../userGenerator';

const existingUser = existingUsers[0];
let newUser: User;
let signupPage: SignupPage;
let accountPage: AccountPage;

test.describe('Sign up page ', () => {
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    accountPage = new AccountPage(page);
    newUser = getNewUser();

    await signupPage.goto();
  })

  test.afterEach(async () => {
    //Here should be code that removes newly created users from db
  })

  test('register a new user', async ({}) => {
    await signupPage.fillInUserForm(newUser);
    await signupPage.clickSubmit();

    await expect(accountPage.getWelcomeText).toBeVisible();
    await expect(accountPage.getWelcomeText).toHaveText(`Welcome ${newUser.firstName} ${newUser.lastName}`);
    await expect(accountPage.getLogoutButton).toBeVisible();
  })

  test('register a new user and login with it', async ({ page }) => {
    const welcomeMessage = `Welcome ${newUser.firstName} ${newUser.lastName}`;

    await signupPage.fillInUserForm(newUser);
    await signupPage.clickSubmit();

    await expect(accountPage.getWelcomeText).toHaveText(welcomeMessage);
    await accountPage.logout();

    const loginPage = new LoginPage(page);
    await loginPage.loginUser(newUser);

    await expect(accountPage.getWelcomeText).toHaveText(welcomeMessage);
  })

  test('signup with existing user', {
    annotation: {
      type: 'issue',
      description: 'A ticket should be raised for showing error message when existing user trying to signup',
    }
  }, async ({}) => {
    await signupPage.fillInUserForm(existingUser);

    const logs: string[] = [];
    signupPage.page.on('console', msg => logs.push(msg.text()));

    await signupPage.clickSubmit();

    //Here should be proper assertions after implementation of error message
    expect(logs).toContain('User already exists');
  })

  test('handling too short password', async ({ }) => {
    newUser.password = '12345678';
    await signupPage.fillInUserForm(newUser);

    await expect(signupPage.submitButton).toBeDisabled();
  })

})

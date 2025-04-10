import { type Locator, type Page } from '@playwright/test';
import { User } from '../../src/App';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly loginButton: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.loginButton = page.getByRole('button', {name: 'Login'});
    this.signupLink = page.getByRole('link', {name: 'Signup'});
    this.invalidCredentialsMessage = page.getByText('Invalid credentials');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async inputEmail(email: string) {
    await this.emailField.fill(email);
  }

  async inputPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
  
  async clickSignupLink() {
    await this.signupLink.click();
  }

  async loginUser(user: User) {
    await this.inputEmail(user.email);
    await this.inputPassword(user.password);
    await this.clickLogin();
  }

  get getInvalidCredentialsMessage() {
    return this.invalidCredentialsMessage;
  }

  get getLoginButton() {
    return this.loginButton;
  }
}
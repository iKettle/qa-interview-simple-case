import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly signupLink: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.emailField = page.locator('#email');
      this.passwordField = page.locator('#password');
      this.loginButton = page.getByRole('button', {name: 'Login'});
      this.signupLink = page.getByRole('link', {name: 'Signup'});
    }
  
    async goto() {
      await this.page.goto('localhost:8080/login');
    }
  
    async inputEmail(email) {
      await this.emailField.fill(email);
    }

    async inputPassword(password) {
      await this.passwordField.fill(password);
    }

    async clickLogin() {
      await this.loginButton.click();
    }
  
    async clickSignupLink() {
      await this.signupLink.click();
    }
  }
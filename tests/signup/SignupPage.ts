import { type Locator, type Page } from '@playwright/test';

export class SignupPage{
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    readonly loginLink: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.firstNameField = page.locator('#firstName');
      this.lastNameField = page.locator('#lastName');
      this.emailField = page.locator('#email');
      this.passwordField = page.locator('#password');
      this.submitButton = page.getByRole('button', {name: 'Submit'});
      this.loginLink = page.getByRole('link', {name: 'Signup'});
    }
  
    async goto() {
      await this.page.goto('/signup');
    }

    async inputFirstName(firstName) {
      await this.firstNameField.fill(firstName);
    }

    async inputLastName(lastName) {
      await this.lastNameField.fill(lastName);
    }
  
    async inputEmail(email) {
      await this.emailField.fill(email);
    }

    async inputPassword(password) {
      await this.passwordField.fill(password);
    }

    async clickSubmit() {
      await this.submitButton.click();
    }
  
    async clickLoginLink() {
      await this.loginLink.click();
    }

}
import { Locator, Page } from "playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly welcomeText: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeText = page.locator('main div');
    this.logoutButton = page.getByRole('button').getByText('Log out');
  }
    
  async getWelcomeText() {
    return this.welcomeText;
  }

  async getLogoutButton() {
    return this.logoutButton;
  }

}
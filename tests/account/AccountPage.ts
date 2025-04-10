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
    
  get getWelcomeText() {
    return this.welcomeText;
  }

  get getLogoutButton() {
    return this.logoutButton;
  }

  async logout() {
    await this.logoutButton.click();
  }

}
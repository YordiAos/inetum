import { Page } from 'playwright';

export class BasePage {
  
  constructor(protected page: Page) {}

  
  async  navigateTo(url: string, timeout: number =29000): Promise<void> {
    await this.page.goto(url, { timeout });
  }
  
}
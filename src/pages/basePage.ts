import { Page } from "playwright";

export class BasePage {
  constructor(protected page: Page) {}
  async navigateTo(url: string, timeout: number = 90000): Promise<void> {
    await this.page.goto(url, { timeout, waitUntil: "networkidle" });
  }

  async waitForElement(
    selector: string,
    state: "visible" | "attached" | "hidden" = "visible",
    timeout = 29000
  ) {
    
    await this.page.waitForSelector(selector, { state, timeout });
    await this.page.isEnabled(selector,{timeout });


    // const element = this.page.locator(selector);
    // await element.waitFor({ state, timeout });
    // Asegurar que el elemento es habilitado antes de continuar
    
  }
}

import { Page } from "playwright";
import { captureAndAttachScreenshot } from "../utils/utils";

export class BasePage {
  constructor(protected page: Page) {}
  async navigateTo(url: string, timeout: number = 29000): Promise<void> {
    await this.page.goto(url, { timeout });
  }

  async captureScreenshot(description: string) {
    await captureAndAttachScreenshot(this.page, description);
  }

  async waitForElement(
    selector: string,
    state: "visible" | "attached" | "hidden" = "visible",
    timeout = 29000
  ) {
    await this.page.waitForSelector(selector, { state, timeout });
  }
}

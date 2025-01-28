import { Page } from "playwright";
import { captureAndAttachScreenshot } from "../utils/utils";
import * as fs from 'fs';


export class BasePage {
  // constructor(protected page: Page) {}
  constructor(protected page: Page) {}
  async navigateTo(url: string, timeout: number = 29000): Promise<void> {
    await this.page.goto(url, { timeout });
  }
  async captureScreenshot(description: string) {
    // const screenshotPath = await captureAndAttachScreenshot(this.page, description);
    //   const screenshotBuffer = fs.readFileSync(screenshotPath);
      // this.attach(screenshotBuffer, 'image/png');
  }

  async waitForElement(
    selector: string,
    state: "visible" | "attached" | "hidden" = "visible",
    timeout = 29000
  ) {
    await this.page.waitForSelector(selector, { state, timeout });
  }
}

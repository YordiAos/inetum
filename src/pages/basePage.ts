import { Page } from "playwright";

export class BasePage {
  constructor(protected page: Page) {}
  
  // async navigateTo(url: string, timeout: number = 90000): Promise<void> {
  //   await this.page.goto(url, { timeout, waitUntil: "networkidle" });
  // }

  async waitForElement(
    selector: string,
    state: "visible" | "attached" | "hidden" = "visible",
    timeout = 29123
  ) {

    await this.page.waitForSelector(selector, { state, timeout });
    await this.page.isEnabled(selector,{timeout });

    
  }
  async safeExecute(actionName: string, action: () => Promise<void>) {
    try {
      await action();
      console.log(`Paso exitoso en:"${actionName}"`);
    } catch (error) {
      console.log(`Error during:: "${actionName}":`, error);
      console.error(`Error during:: "${actionName}":`, error);
      throw new Error(`Prueba detenida debido a la condición....${actionName}`);
      //expect(true).toBe(false); NO DETIENE PRUEBA
    }
  }
}

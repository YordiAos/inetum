import * as fs from "fs";
import { captureAndAttachScreenshot } from "../utils/utils"; // Asegúrate de que esta ruta sea correcta
import { Before, After, setWorldConstructor } from "@cucumber/cucumber";
import { Page, Browser, BrowserContext, chromium } from "playwright";
import { BasePage } from "../pages/basePage";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let basePage: BasePage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage(); // Crea una nueva página
  
});

// After(async () => {
//     // await browser.close(); // Cierra el navegador al finalizar los tests
// });
After(async function () {
  // const screenshotPath = await captureAndAttachScreenshot(
  //   page,
  //   "AFTER-screenshot"
  // );
  // const screenshotBuffer = fs.readFileSync(screenshotPath);
  // this.attach(screenshotBuffer, "image/png");
});

export { browser, context, page }; // Exporta `page` para usarlo en los tests

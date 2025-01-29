import {
  Before,
  After,
  setWorldConstructor,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Page, Browser, BrowserContext, chromium } from "playwright";
import { defineConfig } from "playwright/test";

// import defineConfig from "../../playwright.config"; // Importa tu configuración de Playwright

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(27* 1000); // n segundos para cada paso cucumber

Before(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1900, height: 920 }, // Configura el tamaño del viewport
  });
  page = await context.newPage(); // Crea una nueva página
  // await page.goto('about:blank');
  // await page.keyboard.press("F11");
  page.setDefaultTimeout(10100); // Tiempo para acciones,clic,etc
  page.setDefaultNavigationTimeout(12100); // Tiempo para navegaciones
});

// After(async () => {
//  await browser.close(); // Cierra el navegador al finalizar los tests
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

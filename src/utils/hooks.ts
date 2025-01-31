import {
  Before,
  After,
  setWorldConstructor,
  setDefaultTimeout,
  ITestCaseHookParameter,
} from "@cucumber/cucumber";
import { Page, Browser, BrowserContext, chromium } from "playwright";

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(47 * 1000); // n segundos para cada paso cucumber

Before(async function ({ pickle, testCaseStartedId }: ITestCaseHookParameter) {
  console.log(
    `🚀 Iniciando escenario: ${pickle.name} (Intento: ${testCaseStartedId})`
  );

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1900, height: 920 }, // Configura el tamaño del viewport
  });
  page = await context.newPage(); // Crea una nueva página
  // await page.goto('about:blank');
  // await page.keyboard.press("F11");
  page.setDefaultTimeout(14100); // Tiempo para acciones,clic,etc
  page.setDefaultNavigationTimeout(15200); // Tiempo para navegaciones
});

After(async () => {
  try {
    // await browser.close(); // Cierra el navegador al finalizar los tests
  } catch (error) {
    console.error("Error al cerrar el navegador:", error);
  }
});
// After(async function () {
// const screenshotPath = await captureAndAttachScreenshot(
//   page,
//   "AFTER-screenshot"
// );
// const screenshotBuffer = fs.readFileSync(screenshotPath);
// this.attach(screenshotBuffer, "image/png");
// });

export { browser, context, page }; // Exporta `page` para usarlo en los tests

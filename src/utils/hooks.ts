import {
  Before,
  After,
  setWorldConstructor,
  setDefaultTimeout,
  ITestCaseHookParameter,
} from "@cucumber/cucumber";
import { Page, Browser, BrowserContext, chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";


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
  // Cargar las cookies exportadas desde Chrome
  try {
    // Ajusta la ruta al archivo cookies.json según la estructura de tu proyecto
    const cookiesFilePath = path.join(__dirname, "cookies.json");
    const cookiesData = fs.readFileSync(cookiesFilePath, "utf8");
    const cookies = JSON.parse(cookiesData);

    // Agregar las cookies al contexto
    await context.addCookies(cookies);
    console.log("✅ Cookies cargadas en el contexto");
  } catch (error) {
    console.error("⚠️ Error al cargar las cookies:", error);
  }

  page = await context.newPage(); // Crea una nueva página
  // await page.goto('about:blank');
  // await page.keyboard.press("F11");
  page.setDefaultTimeout(14100); // Tiempo para acciones,clic,etc
  page.setDefaultNavigationTimeout(15200); // Tiempo para navegaciones
});

After(async () => {
  try {
    // await page.close();
    // await context.close();
    // await browser.close();
  } catch (error) {
    console.error("Error al cerrar el navegador:", error);
  }
});

export { browser, context, page }; // Exporta `page` para usarlo en los tests

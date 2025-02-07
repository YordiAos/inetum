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
import dotenv from 'dotenv';

let browser: Browser;
let context: BrowserContext;
let page: Page;

dotenv.config();
setDefaultTimeout(parseInt(process.env.TIMEOUT_STEPS||'61123')); // n segundos para cada paso cucumber
export const timeoutElements = process.env.TIMEOUT_ELEMENTS ? parseInt(process.env.TIMEOUT_ELEMENTS) : 59123;
export const timeoutPages = process.env.TIMEOUT_PAGES ? parseInt(process.env.TIMEOUT_PAGES) : 60123;

Before(async function ({ pickle, testCaseStartedId }: ITestCaseHookParameter) {
  console.log(
    `🚀 Iniciando escenario: ${pickle.name} (Intento: ${testCaseStartedId})`
  );

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1900, height: 920 }, // Configura el tamaño del viewport
  });
  let ambienteBajo = "N0";
  if (ambienteBajo == "SI") {
    const cookiesFilePath = path.join(__dirname, "cookies.json");
    try {
      const cookiesData = fs.readFileSync(cookiesFilePath, "utf8");
      const cookies = JSON.parse(cookiesData);

      // Verificar y ajustar la propiedad sameSite si es null
      const formattedCookies = cookies.map((cookie: any) => ({
        ...cookie,
        sameSite:
          !cookie.sameSite ||
          cookie.sameSite === "no_restriction" ||
          cookie.sameSite === "lax"
            ? "Lax"
            : cookie.sameSite,
      }));
      // console.log(JSON.stringify(formattedCookies, null, 2));

      // Agregar las cookies al contexto
      await context.addCookies(formattedCookies);
      console.log("✅ Cookies cargadas en el contexto");
    } catch (error) {
      console.error("⚠️ Error al cargar las cookies:", error);
    }
  }

  page = await context.newPage(); // Crea una nueva página
  // await page.goto('about:blank');
  // await page.keyboard.press("F11");
  console.log("HOOKS timeoutElements:",timeoutElements);
  page.setDefaultTimeout(timeoutElements); // Tiempo para acciones,clic,etc
  console.log("HOOKS timeoutPages:",timeoutPages);
  page.setDefaultNavigationTimeout(timeoutPages); // Tiempo para navegaciones waitForNavigation()
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

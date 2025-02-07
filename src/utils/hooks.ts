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

import { getEnvironmentUrl, TIMEOUTS } from "./config"; // Importamos la configuración

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Aplicamos los timeouts desde config.ts
setDefaultTimeout(TIMEOUTS.STEPS);
export const timeoutElements = TIMEOUTS.ELEMENTS;
export const timeoutPages = TIMEOUTS.PAGES;

// Obtenemos la URL del entorno desde config.ts
export const baseUrl: string = getEnvironmentUrl(process.env.ENV || "QA");
console.log(`🌍 URL Base: ${baseUrl}`);


Before(async function ({ pickle, testCaseStartedId }: ITestCaseHookParameter) {
  console.log(
    `🚀 Iniciando escenario: ${pickle.name} (Intento: ${testCaseStartedId})`
  );

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1900, height: 920 }, // Configura el tamaño del viewport
  });
  
  if (baseUrl == "GD") {
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

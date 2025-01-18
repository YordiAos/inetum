import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { SovosPage } from "../pages/sovos.page"; // Ajusta la ruta si es necesario
import { BasePage } from "../pages/basePage"; // BasePage para manejar navegación común, si existe

let browser: Browser;
let page: Page;
let sovosPage: SovosPage;
let basePage: BasePage;

setDefaultTimeout(60000); // Establecer un tiempo de espera predeterminado para la prueba, si es necesario

Given(
  "que he iniciado sesion y estoy en la web SOVOS {string}",
  async (url: string) => {
    browser = await chromium.launch({ headless: false }); // Lanzar el navegador
    page = await browser.newPage(); // Crear una nueva página
    // Maximiza el área de visualización de la página
    await page.setViewportSize({ width: 1900, height: 900 }); // por alguna razon no toma playwrigt.config.ts
    sovosPage = new SovosPage(page); // Instancia de la página de SOVOS
    basePage = new BasePage(page); // Instancia de la página base (si tienes alguna para navegación común)

    // Navegar a la página de login y realizar el login
    await sovosPage.login(url);
    await sovosPage.openPage(); // Acceder a la página de documentos rechazados
  }
);

When("filtro por documentos {string} de la fecha {string}", async (status: string,fecha:string) => {
  await sovosPage.filterRejectedDocuments(status,fecha); // Filtrar los documentos rechazados
});

// Then('se debe mostrar por consola o por correo los documentos rechazados', async () => {
//   await sovosPage.verifyRejectedDocuments(); // Verificar que se muestren los documentos rechazados
//   await browser.close(); // Cerrar el navegador después de la prueba
// });

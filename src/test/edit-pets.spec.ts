import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

import { PetProfilePage } from "../pages/edit-pets.page"; // Importa la clase de la página
import { BasePage } from "../pages/basePage";
import { getEnvironmentUrl } from "../../config";
let browser: Browser;
let page: Page;
let petProfilePage: PetProfilePage;
let basePage: BasePage;

Given("que estoy en el perfil de la mascota", async () => {
  // Aquí asumimos que 'page' es un objeto de Playwright que ya está inicializado en el contexto
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  petProfilePage=new PetProfilePage(page);

  basePage = new BasePage(page);
  const URL = getEnvironmentUrl("URL");
  await basePage.navigateTo(URL);
});

When(
  "agrego una visita con fecha {string} y descripción {string}",
  async (fecha: string, descripcion: string) => {
    // Agregar la visita con los datos proporcionados
    await petProfilePage.agregarVisita(fecha, descripcion);
  }
);

Then(
  "la visita con descripción {string} debe aparecer en la lista de visitas",
  async (descripcion: string) => {
    // Verificar si la visita aparece en la lista
    const visitaAgregada = await petProfilePage.verificarVisitaEnLista(
      descripcion
    );
    if (!visitaAgregada) {
      throw new Error(
        `La visita con la descripción "${descripcion}" no se encontró en la lista.`
      );
    }
  }
);

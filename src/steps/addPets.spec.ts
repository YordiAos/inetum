import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

import { OwnerProfilePage } from "../pages/addPets.page";
import { getEnvironmentUrl } from "../../config";
import assert from "assert";

let browser: Browser;
let page: Page;
let ownerProfilePage: OwnerProfilePage;
let petNameGlobal: string;

setDefaultTimeout(30 * 1000);

// Función para generar un nombre aleatorio de 5 caracteres
function generarNombreAleatorio(longitud: number): string {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indice);
  }
  return resultado;
}

Given("I am on the owner's profile page", async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  ownerProfilePage = new OwnerProfilePage(page);
  const URL = getEnvironmentUrl("URL");
  await ownerProfilePage.navigateTo(URL);
  
});

When('I select "Add New Pet"', async () => {
  await ownerProfilePage.navigateToOwnerProfile();
});

When(
  "I fill out the pet form with valid pet information {string} {string} {string}",
  async (petName: string, species: string, birthDate: string) => {
    // Generar un nombre aleatorio o usar el proporcionado
    petNameGlobal = petName.toUpperCase() === "aleatorio".toUpperCase()
      ? generarNombreAleatorio(5)
      : petName;

    console.log(petNameGlobal, species, birthDate);
    await ownerProfilePage.addPet(petNameGlobal, species, birthDate);
  }
);

Then("Check registered pet", async () => {
  const mascotasEnLista = await ownerProfilePage.getPet();
  console.log("mascotasEnLista:", mascotasEnLista);
  const mascotaEncontrada = mascotasEnLista.includes(petNameGlobal);
  console.log(mascotaEncontrada);

  assert.strictEqual(
    mascotaEncontrada,
    true,
    "La mascota no fue encontrada en la lista"
  );  
  await browser.close();
});

Then("Check update pet", async () => {
  const mascotasEnLista = await ownerProfilePage.getPet();
  console.log("mascotasEnLista:", mascotasEnLista);
  const mascotaEncontrada = mascotasEnLista.includes(petNameGlobal);
  console.log(mascotaEncontrada);

});

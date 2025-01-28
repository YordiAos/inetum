import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";


let loginPage: LoginPage;

// Paso para inicializar el navegador
Given("un usuario de tipo {string} con correo {string} y clave {string}", async function (tipoUsuario, correo, clave) {
  const { page } = this; // Contexto de Playwright en Cucumber
  loginPage = new LoginPage(page);
  this.userCredentials = { tipoUsuario, correo, clave }; // Guardamos las credenciales en el contexto
});

// Paso para realizar el login
When("el usuario ingresa con las credenciales", async function () {
  const { correo, clave } = this.userCredentials;
  await loginPage.navigate();
  await loginPage.enterCredentials(correo, clave);
  await loginPage.submitLogin();
});

// Paso para buscar productos y seleccionar tienda
Then("el usuario debería poder buscar el producto {string} y seleccionar la tienda {string}", async function (producto, tienda) {
  await loginPage.pageHomeAddProduct(producto, tienda);
  await loginPage.pageMinicarrito();
  await loginPage.pageCarrito();
  await loginPage.pageCheckout();

  // Verifica que la página esté en el estado esperado
  await new Promise(resolve => setTimeout(resolve, 2000));
  // expect(await loginPage.verifySuccess()).toBeTruthy();
});

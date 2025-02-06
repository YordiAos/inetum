import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginPage";
import { page } from "../utils/hooks"; // Importa `page` desde los hooks
import { Utils } from "../utils/utils";
import { HomePage } from "../pages/homePage";

let loginPage: LoginPage;
let homePage: HomePage;

// setDefaultTimeout(68000); // Establecer un tiempo de espera predeterminado para la prueba, si es necesario

// Paso para inicializar el navegador
Given(
  "un usuario de tipo {string} con correo {string} y clave {string} ingresa a {string}",
  async function (tipoUsuario, correo, clave,web) {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    this.userCredentials = { tipoUsuario, correo, clave,web }; // Guardamos las credenciales en el contexto
  }
);

// Paso para realizar el login
When("el usuario ingresa con las credenciales", async function () {
  const { correo, clave,web } = this.userCredentials;
  await loginPage.navigate(web);
  this.attach(
    await Utils.captureAndAttachScreenshot(page, "Home-Screenshot"),
    "image/png"
  );
  await loginPage.enterCredentials(correo, clave);
  this.attach(
    await Utils.captureAndAttachScreenshot(page, "Datos Login-Screenshot"),
    "image/png"
  );
  await loginPage.submitLogin();
  this.attach(
    await Utils.captureAndAttachScreenshot(page, "After Login-Screenshot"),
    "image/png"
  );
});

// Paso para buscar productos y seleccionar tienda
Then(
  "el usuario debería poder buscar el producto {string} y seleccionar la tienda {string}",
  async function (producto, tienda) {
    // await loginPage.pageHomeAddProduct(producto, tienda);
    await homePage.pageHomeAddProduct(producto, tienda);
    await loginPage.pageMinicarrito();
    // await loginPage.pageCarrito();
    // await loginPage.pageCheckout();

    // Verifica que la página esté en el estado esperado
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // expect(await loginPage.verifySuccess()).toBeTruthy();
  }
);

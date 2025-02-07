import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginPage";
import { page } from "../utils/hooks"; // Importa `page` desde los hooks
import { Utils } from "../utils/utils";
import { HomePage } from "../pages/homePage";
import { MiniCartPage } from "../pages/miniCartPage";
import { PageCarrito } from "../pages/carritoPage";
import { PageHomeAddProducPage } from "../pages/pageHomeAddProducPage";

let loginPage: LoginPage;
let homePage: HomePage;
let miniCartPage : MiniCartPage;
let pageCarrito: PageCarrito;
let pageHomeAddProducPage:PageHomeAddProducPage;

// setDefaultTimeout(68000); // Establecer un tiempo de espera predeterminado para la prueba, si es necesario

// Paso para inicializar el navegador
Given(
  "un usuario de tipo {string} con correo {string} y clave {string}",
  async function (tipoUsuario, correo, clave) {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    miniCartPage = new MiniCartPage(page);
    pageCarrito = new PageCarrito(page);
    pageHomeAddProducPage = new PageHomeAddProducPage(page);

    this.userCredentials = { tipoUsuario, correo, clave }; // Guardamos las credenciales en el contexto
  }
);

// Paso para realizar el login
When("el usuario ingresa con las credenciales", async function () {
  const { correo, clave } = this.userCredentials;
  await loginPage.navigate();
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

Then(
  "el usuario debería poder buscar el producto {string} y seleccionar la tienda {string}",
  async function (producto, tienda) {
    // await loginPage.pageHomeAddProduct(producto, tienda);
    await pageHomeAddProducPage.pageHomeAddProduct(producto, tienda);
    await miniCartPage.pageMinicarrito();

    // await loginPage.pageCarrito();
    // await loginPage.pageCheckout();
    // expect(await loginPage.verifySuccess()).toBeTruthy();
  }
);
Then("ir a pagina carrito", async function () {
  await pageCarrito.pageCarrito();
});

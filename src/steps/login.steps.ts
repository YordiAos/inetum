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
let miniCartPage: MiniCartPage;
let pageCarrito: PageCarrito;
let pageHomeAddProducPage: PageHomeAddProducPage;

// setDefaultTimeout(68000); // Establecer un tiempo de espera predeterminado para la prueba, si es necesario

// Paso para inicializar el navegador

Given(
  "un usuario {string} con el correo {string} y clave {string} inicia sesión en la web",
  async function (tipoUsuario, correo, clave) {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    miniCartPage = new MiniCartPage(page);
    pageCarrito = new PageCarrito(page);
    pageHomeAddProducPage = new PageHomeAddProducPage(page);

    this.userCredentials = { tipoUsuario, correo, clave };
    // const { correo, clave } = this.userCredentials;
    await loginPage.login(correo, clave, this.attach);
  }
);

When("busca el producto {string}", async function (producto) {
  await pageHomeAddProducPage.pageHomeAddProduct(producto);
});
When("selecciona la tienda {string} para la compra", async function (tienda) {
  await pageHomeAddProducPage.pageHomeSelectStore(tienda);
});

When(
  "el producto debería aparecer en la página del carrito",
  async function () {
    await miniCartPage.pageMinicarrito();
  }
);

// await loginPage.pageCarrito();
// await loginPage.pageCheckout();
// expect(await loginPage.verifySuccess()).toBeTruthy();

// Then("ir a pagina carrito", async function () {
//   await pageCarrito.pageCarrito();
// });

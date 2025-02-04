// src/pages/loginPage.ts
import test, { expect, Page } from "playwright/test";
import { BasePage } from "./basePage";


export class LoginPage extends BasePage {
  
  constructor(page:Page) {
    super(page);
  }
    
  private iconoLogin = ".vtex-overlay-layout-0-x-trigger";
  private aceptarCookies = ".swal2-confirm.swal2-styled";
  private usernameInput = 'input[placeholder="Ej.: ejemplo@mail.com"]';
  private passwordInput = 'input[placeholder="Ingrese su contraseña "]';

  private checkBox = ".wongio-store-theme-7-x-auth__checkbox_div";
  private submitButton = ".vtex-login-2-x-sendButton";
  private validarTextPuntosBonus =
    "h1.wongio-wongiocompo2app-0-x-points__title";
  
  
  private tituloModalServiciosEntrega =
    ".wongio-wongiocompo1app-0-x-menu__title";
  
  private desplegableTienda = ".wongio-wongiocompo1app-0-x-pickup__select";
  private buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";

  private iconoCarrito = ".wongio-minicart-2-x-minicartIconContainer";
  private namePrimerProductoMiniCarrito = '[id^="name-"]';
  private buttonViewMiniCart = "#proceed-to-checkout";

  

  async navigate() {
    console.log("Navigate to login page");
    await this.navigateTo("https://www.wong.pe");
  }

  async enterCredentials(username: string, password: string) { 
    const acceptCookiesButton = this.page.locator(this.aceptarCookies); // Ajusta el selector según el botón que aparece en tu página
    await acceptCookiesButton.waitFor({ state: "visible" }); // Espera hasta que sea visible
    await acceptCookiesButton.click();

    await this.page.click(this.iconoLogin);

    await this.waitForElement(".pv3 input[placeholder]");
    const inputs = await this.page.$$(".pv3 input[placeholder]");
    if (inputs.length < 2) {
      throw new Error("No se encontraron los campos de usuario y contraseña");
    }
    const user = inputs[0]; // Primer campo de input
    const pass = inputs[1]; // Segundo campo de input
    await user.fill(username);
    await pass.fill(password);
    /*
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      */
    await this.page.click(this.checkBox);
  }

  async submitLogin() {
    await this.page.click(this.submitButton);
    // await this.waitForElement(this.validarTextPuntosBonus);
    // const welcomeText = await this.page
    //   .locator(this.validarTextPuntosBonus)
    //   .innerText();
    // expect(welcomeText).toContain("Tienes disponible:");
  }
  async esperarFormLogin(ejecucion: string = "default") {
    await this.page.waitForLoadState("networkidle");
    await this.page.click(this.iconoLogin);
    if (ejecucion == "completa") {
      await this.waitForElement(this.passwordInput);
      await this.page.click(this.passwordInput);
    }
  }
 
  

  async pageMinicarrito() {
    await this.safeExecute("Esperar icono carrito", () =>
      this.waitForElement(this.iconoCarrito)
    );
    await this.safeExecute("Clic icono carrito", () =>
      this.page.click(this.iconoCarrito)
    );
    await this.safeExecute("Esperar nombre primer producto ", () =>
      this.waitForElement(this.namePrimerProductoMiniCarrito)
    );
    await this.safeExecute("clic boton 'VER CARRITO' ", () =>
      this.page.click(this.buttonViewMiniCart)
    );
  }
  async pageCarrito() {
    //PAGINA CARRITO POR MOVER A OTRO METODO
    await this.safeExecute(
      "Redireccion y espera de cargar todas peticiones de page carrito",
      () =>
        // Espera hasta que no haya más peticiones activas.
        this.page.waitForLoadState("networkidle")
    );
    await this.safeExecute(
      "Clic checkbox aceptar terminos y condiciones ",
      () => this.page.click(".icon-check-terms")
    );
    // Opcional: Espera a que el checkbox esté marcado
    const isChecked = await this.page.isChecked("#opt-in-terms-policies"); // Usa el selector adecuado
    if (isChecked) {
      console.warn("✅ Checkbox marcado exitosamente");
    } else {
      console.warn("❌ El checkbox NO está marcado");
    }
    //Detiene la prueba si check no esta marcado
    expect(isChecked).toBe(true);
    await this.safeExecute(
      "Espera y clic del boton 'FINALIZAR PEDIDO' ",
      async () => {
        await this.waitForElement('a[data-i18n="cart.finalize"]'); 
        await this.page.click('a[data-i18n="cart.finalize"]'); 
      }
    );
    this.page.on("load", async () => {
      console.log(
        "DESPUES CLIC FINALIZAR PEDIDO,se detecto recarga_page_XBORRAR"
      );
    });
  }

  async safeExecute(actionName: string, action: () => Promise<void>) {
    try {
      await action();
      console.log(`Paso exitoso en:"${actionName}"`);
    } catch (error) {
      console.error(`Error during:: "${actionName}":`, error);
      throw new Error(`Prueba detenida debido a la condición....${actionName}`);
      //expect(true).toBe(false); NO DETIENE PRUEBA 
    }
  }
}

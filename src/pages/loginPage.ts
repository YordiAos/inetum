// src/pages/loginPage.ts
import test, { expect, Page } from "playwright/test";
import { BasePage } from "./basePage";


export class LoginPage extends BasePage {
  
  constructor(page:Page) {
    super(page);
  }
    
    // await homePage.selectStore(tienda);
    // Se debe llamar a super() y pasar los argumentos necesarios antes de usar "this".
    // super(this.page);
    // Inicialización de los selectores
    // this.desplegableTienda = '.selector-del-desplegable';  // Reemplaza por el selector real
    // this.buttonConfirmarTienda = '.selector-del-boton-confirmar'; // Reemplaza por el selector real
  

  // [x: string]: any;
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

  //await page.click('.wongio-wongiocompo1app-0-x-menu__button_icon:nth-of-type(2)');
  
  
  private iconoCarrito = ".wongio-minicart-2-x-minicartIconContainer";
  private namePrimerProductoMiniCarrito = '[id^="name-"]';
  private buttonViewMiniCart = "#proceed-to-checkout";

  

  async navigate() {
    console.log("Navigate to login page");
    await this.navigateTo("https://www.wong.pe");
  }

  async enterCredentials(username: string, password: string) {
    // Espera a que el botón de aceptación de cookies sea visible
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
    //PAGINA DE MINICARRITO
    await this.safeExecute("Esperar icono carrito", () =>
      this.waitForElement(this.iconoCarrito)
    );
    await this.safeExecute("Clic icono carrito", () =>
      this.page.click(this.iconoCarrito)
    );
    //el boton "VER CARRITO" puede estar habilitado pero no carga bien si no se espera q cargue el minicarrito
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
        await this.waitForElement('a[data-i18n="cart.finalize"]'); // Espera que el elemento esté disponible
        await this.page.click('a[data-i18n="cart.finalize"]'); // Haz clic en el elemento
      }
    );
    this.page.on("load", async () => {
      console.log(
        "DESPUES CLIC FINALIZAR PEDIDO,se detecto recarga_page_XBORRAR"
      );
    });
  }
  async pageCheckout() {
    await this.safeExecute(
      "Redireccion y espera de cargar todas peticiones de page checkout",
      () => this.page.waitForLoadState("networkidle")
    );
    //seccion identificcacion
    /*await this.safeExecute("Formulario Identificación ", () =>
      this.waitForElement('#go-to-shipping')
    );*/
    await this.safeExecute(
      "Espera elemento interactuable y clic boton'IR A METODO DE ENTREGA'",
      () => this.page.click("#go-to-shipping:visible")
    );
    await this.safeExecute(
      "Espera elemento interactuable y clic boton'ELIJA UNA FECHA DE ENTREGA'",
      () => this.page.click('label:has-text("ELIJA UNA FECHA DE ENTREGA")')
    );
    // Detectar recarga en la página
    this.page.on("load", async () => {
      console.log("se detecto recarga_page");
      await this.safeExecute(
        "Espera elemento interactuable y clic boton'ELIJA UNA FECHA DE ENTREGA'",
        () => this.page.click('label:has-text("ELIJA UNA FECHA DE ENTREGA")')
      );
    });

    this.chooseDate();
    this.getCurrentDate(10);
  }

  async chooseDate() {
    // Suponiendo que ya tienes una instancia de la página
    const dias = await this.page.$$(
      '[aria-label^="day-"]:not(.react-datepicker__day--disabled)'
    );
    const diasNoHabilitados = [];
    // Usamos un bucle for para iterar sobre todos los elementos encontrados
    for (let i = 0; i < dias.length; i++) {
      // Accedemos al elemento individual
      const dia = dias[i];
      // Obtener el texto del elemento usando evaluate
      const texto = await this.page.evaluate((elemento) => {
        // Comprobamos si 'elemento.textContent' no es nulo antes de devolverlo
        return elemento.textContent
          ? elemento.textContent.trim()
          : "day_disabled_empty"; // Si es nulo, devolvemos una cadena vacía
      }, dia);
      diasNoHabilitados.push(texto);
    }
    console.warn(diasNoHabilitados);
  }
  async getCurrentDate(days: number) {
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Sumar 10 días a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + days);
    // Mostrar la fecha actual y la fecha resultante
    console.log("Fecha Actual: " + new Date());
    console.log("Fecha con 10 días añadidos: " + fechaActual);
  }

  async safeExecute(actionName: string, action: () => Promise<void>) {
    try {
      await action();
      console.log(`Paso exitoso en:"${actionName}"`);
    } catch (error) {
      console.error(`Error during:: "${actionName}":`, error);
      throw new Error(`Prueba detenida debido a la condición....${actionName}`);

      //expect(true).toBe(false); NO DETIENE PRUEBA ,PENDIENTE PRUEBAS
    }
  }
}

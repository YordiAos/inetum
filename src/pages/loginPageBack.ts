// src/pages/loginPage.ts
import test, { expect } from "playwright/test";
import { BasePage } from "./basePage";
import { GeneradorCorreo } from "../utils/generadorCorreo";
import { Utils } from "../utils/utils";

export class LoginPage extends BasePage {
  private iconoLogin = ".vtex-overlay-layout-0-x-trigger";
  private aceptarCookies = ".swal2-confirm.swal2-styled";
  private usernameInput = 'input[placeholder="Ej.: ejemplo@mail.com"]';
  private passwordInput = 'input[placeholder="Ingrese su contraseña "]';

  private checkBox = ".wongio-store-theme-7-x-auth__checkbox_div";
  private submitButton = ".vtex-login-2-x-sendButton";
  private validarTextPuntosBonus =
    "h1.wongio-wongiocompo2app-0-x-points__title";
  private validarTextResultadoBusqueda =
    ".vtex-rich-text-0-x-paragraph--rto-busqueda-txt";
  private buttonAddProducto = ".vtex-button__label.border-box";
  private tituloModalServiciosEntrega =
    ".wongio-wongiocompo1app-0-x-menu__title";
  private buttonRecogojoEnTienda =
    'button img[alt="Seleccionar Recojo en Tienda"]';
  private desplegableTienda = ".wongio-wongiocompo1app-0-x-pickup__select";
  private buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";
  private cajaBusqueda = ".vtex-styleguide-9-x-input";
  private inputCantidadProductosHome =
    ".wongio-wongiocompo1app-0-x-numeric_stepper__input";
  private iconoCarrito = ".wongio-minicart-2-x-minicartIconContainer";
  private namePrimerProductoMiniCarrito = '[id^="name-"]';
  private buttonViewMiniCart = "#proceed-to-checkout";

  async navigate() {
    console.log("Navigate to login page");
    await this.navigateTo("https://www.wong.pe");
    console.log("TESTINGGG");
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
  async validarCargaCorrectaPagina(
    url: string,
    localizador: string,
    textoEsperado: string
  ) {
    this.esperarFormLogin();
    if (url == "https://www.wong.pe/institucional/terminos-y-condiciones") {
      // Escucha el evento 'page' para capturar la nueva pestaña.
      const [newTab] = await Promise.all([
        this.page.waitForEvent("popup"),
        this.page.click(`//a[@href="${url}"]`), // Haces clic en el enlace que abre la nueva pestaña.
      ]);
      await newTab.waitForLoadState("load");
      // Ahora interactúas con la nueva pestaña (newTab).
      const textoObtenido = (await newTab.locator(localizador).innerText())
        .trim()
        .toLowerCase();
      expect(textoEsperado.trim().toLowerCase()).toEqual(textoObtenido);
    } else {
      console.log("RECARGAMISMAPAGINA");
      await this.page.click(`//a[@href="${url}"]`);
      await this.page.waitForLoadState("networkidle");
      await this.waitForElement(localizador);
      const textoObtenido = (await this.page.locator(localizador).innerText())
        .trim()
        .toLowerCase();
      expect(textoEsperado.trim().toLowerCase()).toEqual(textoObtenido);
    }
  }
  async compararTextoConColorEsperado(
    textoEsperado: string,
    textoInsertar: string
  ) {
    this.esperarFormLogin("completa");
    await this.page.fill(this.passwordInput, textoInsertar);
    await this.validarTextoDeUnElementoCapturado(textoEsperado);
  }
  async validarTextosDeRequisitosDeContraseña() {
    await test.step("Sub pasos", async () => {
      this.esperarFormLogin("completa");
      //CREAR METODO PARA REPLICAR PARA N ELEMENTOS
      await this.validarTextoEnElementoPorIndice(1, "ABC Una letra mayúscula");
      await this.validarTextoEnElementoPorIndice(2, "abc Una letra minúscula");
      await this.validarTextoEnElementoPorIndice(3, "123 Un número");
      await this.validarTextoEnElementoPorIndice(4, "*** Mínimo 8 caracteres");
    });
  }
  async validarTextoDeUnElementoCapturado(textoEsperado: string) {
    // Captura el texto del hijo correspondiente
    const texto = await this.page.locator(`.flex-row.c-success`).innerText();
    // Transformación del texto si es necesario
    const textoTransformado = Utils.transformarTexto(texto);
    console.log(`texto capturado:`, textoTransformado, " vs ", textoEsperado);
    expect(textoTransformado?.trim()).toEqual(textoEsperado);
  }
  async validarTextoEnElementoPorIndice(
    indiceHijo: number,
    textoEsperado: string
  ) {
    // Captura el texto del hijo correspondiente
    const texto = await this.page
      .locator(`.mt2:nth-child(${indiceHijo})`)
      .innerText();

    const textoTransformado = Utils.transformarTexto(texto);
    console.log(
      `texto capturado ${indiceHijo}:`,
      textoTransformado,
      " vs ",
      textoEsperado
    );
    expect(textoTransformado?.trim()).toEqual(textoEsperado);
  }

  async alertaMensajeErrorLogin(mensaje: string, tipoMensaje: string) {
    // const iconoLogin=this.page.locator(this.iconoLogin);
    // await iconoLogin.waitFor({ state: "visible" });
    // await iconoLogin.click();
    // Crear una instancia de la clase y generar el correo
    const generadorCorreo = new GeneradorCorreo();
    let correoAleatorio = generadorCorreo.generarCorreo(4); // Cambiar el nombre si lo deseas
    this.page.waitForLoadState("networkidle");
    await this.page.click(this.iconoLogin);
    await this.waitForElement(this.usernameInput);
    if (tipoMensaje == "login") {
      console.log(correoAleatorio);
      await this.page.fill(this.usernameInput, correoAleatorio);
      await this.page.fill(this.passwordInput, "12345678aA");
    } else if (tipoMensaje == "correo") {
      await this.page.fill(this.usernameInput, "correoinvalido@c.");
    } else if (tipoMensaje == "password") {
      console.log(correoAleatorio);
      await this.page.fill(this.usernameInput, correoAleatorio);
    }
    //NO le da clic al checkbox
    // await this.waitForElement(this.checkBox);
    await this.page.waitForTimeout(1500);
    await this.page.click(this.checkBox);
    const isChecked = await this.page.isChecked(
      ".wongio-wongiocompo1app-0-x-auth__checkbox_input"
    );
    if (isChecked) {
      console.log("✅ Checkbox login exitoso");
    } else {
      console.warn("❌ EL CHECKBOX NO ESTA MARCADO");
    }
    //Detiene la prueba si check no esta marcado
    expect(isChecked).toBe(true);
    await this.page.click(this.submitButton);

    const errorText = await this.page
      .locator(".vtex-login-2-x-formError") //:visible
      .textContent();
    try {
      expect(errorText?.trim()).toEqual(mensaje);
    } catch (error) {
      await this.page.waitForTimeout(69000);
      // throw error; // Re-lanza el error después de esperar
    }
  }

  async pageHomeAddProduct(producto: string, tienda: string) {
    // Se repite 2 veces puesto q existe 2 recargas f5
    // await this.page.waitForLoadState("networkidle");
    // await this.page.waitForLoadState("networkidle");
    await this.safeExecute("Esperar recarga web 2 veces", async () => {
      this.page.waitForTimeout(9.5 * 1000);
    });

    await this.safeExecute(
      "Esperar caja y escribir producto presionando enter ",
      async () => {
        await this.waitForElement(this.cajaBusqueda);
        this.page.fill(this.cajaBusqueda, producto);
        this.page.press(this.cajaBusqueda, "Enter");
      }
    );

    await this.safeExecute("Esperar texto resultado busqueda", () =>
      this.waitForElement(this.validarTextResultadoBusqueda)
    );
    await this.safeExecute("Esperar boton agregar producto", () =>
      this.waitForElement(this.buttonAddProducto)
    );
    await this.safeExecute("Primer click boton agregar producto", () =>
      this.page.click(this.buttonAddProducto)
    );

    await this.waitForElement(this.buttonRecogojoEnTienda);
    await this.page.click(this.buttonRecogojoEnTienda);
    await this.selectStore(tienda);

    await this.safeExecute("Esperar texto resultado busqueda", () =>
      this.waitForElement(this.validarTextResultadoBusqueda)
    );
    await this.safeExecute("Esperar boton agregar producto", () =>
      this.waitForElement(this.buttonAddProducto)
    );
    await this.safeExecute("Click en boton agregar producto", () =>
      this.page.click(this.buttonAddProducto)
    );

    await this.safeExecute("Esperar caja cantidad productos", async () => {
      await this.waitForElement(this.inputCantidadProductosHome); // Espera a que el input aparezca
      const txtCantidad = await this.page
        .locator(this.inputCantidadProductosHome)
        .inputValue(); //obtener input de la caja cantidad
      // const valor = await inputLocator.inputValue(); // Obtener el texto del input
      console.log("📌 Texto en caja de cantidad productos:", txtCantidad);
    });
  }

  async selectStore(optionText: string) {
    await this.waitForElement(".wongio-wongiocompo1app-0-x-pickup__title"); //titulo modal "Retiro en tienda"
    await this.page.selectOption(this.desplegableTienda, { label: optionText });
    await this.waitForElement(this.buttonConfirmarTienda);
    await this.page.click(this.buttonConfirmarTienda);
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

// src/pages/loginPage.ts
import test, { expect, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  
  private iconoLogin = ".vtex-overlay-layout-0-x-trigger";
  private aceptarCookies = ".swal2-confirm.swal2-styled";
  private usernameInput = 'input[placeholder="Ej.: ejemplo@mail.com"]';
  private passwordInput = 'input[placeholder="Ingrese su contraseña "]';

  private checkBox = ".wongio-store-theme-7-x-auth__checkbox_div";
  private checkBox_GenDataMyvtex =
    ".wongfoodqawlschv6io-wongiocompo1app-0-x-auth__checkbox_div";

  private submitButton = ".vtex-login-2-x-sendButton";
  private validarTextPuntosBonus =
    "h1.wongio-wongiocompo2app-0-x-points__title";

  private tituloModalServiciosEntrega =
    ".wongio-wongiocompo1app-0-x-menu__title";

  private desplegableTienda = ".wongio-wongiocompo1app-0-x-pickup__select";
  private buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";

  
  async navigate(url: string) {
    console.log("Navigate to login page");
    await this.navigateTo(url);
  }

  async enterCredentials(username: string, password: string) {
    // NO EN AMBIENTE WONGFOOD.VTEX.COM
    if (this.page.url() == "https://wongfoodqawlschv6io.myvtex.com/") {
    } else {
      const acceptCookiesButton = this.page.locator(this.aceptarCookies); // Ajusta el selector según el botón que aparece en tu página
      await acceptCookiesButton.waitFor({ state: "visible" }); // Espera hasta que sea visible
      await acceptCookiesButton.click();
    }

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
    if (this.page.url() == "https://wongfoodqawlschv6io.myvtex.com/") {
      await this.page.click(this.checkBox_GenDataMyvtex);
    } else {
      await this.page.click(this.checkBox);
    }
  }

  async submitLogin() {
    await this.page.click(this.submitButton);
    await Promise.all([this.page.waitForNavigation({ waitUntil: "load" })]);

    await this.waitForElement(this.iconoLogin);
    await this.page.click(this.iconoLogin);

    await this.waitForElement('a[href="/account#/profile"]');
    const elemento = await this.page.$('a[href="/account#/profile"]');
    if (elemento) {
      console.log("✅ Login exitoso ✅");
    } else {
      console.log("❌LOGIN INCORRECTO❌");
    }

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

  async pageCarrito() {
    await this.safeExecute(
      "Clic checkbox aceptar terminos y condiciones 1",
      () => this.page.click(".icon-check-terms")
    );


    await this.safeExecute(
      "Espera y clic del boton 'FINALIZAR PEDIDO' ",
      async () => {
        await this.waitForElement('a[data-i18n="cart.finalize"]');
        await this.page.click('a[data-i18n="cart.finalize"]');
      }
    );

    await Promise.all([
      this.page.waitForURL(/.*\/checkout\/#\/(shipping|profile|testing)/,{ timeout: 9999 }),
      // this.page.waitForURL('**/checkout/#/shipping'),
      // this.page.waitForURL('**/checkout/#/profile')
    ]);

    await this.safeExecute(
      "Espera y clic del boton 'METODO DE ENTREGA' ",
      async () => {
        // await this.page.waitForTimeout(5000); // remplazado por page.waitForURL
        // await this.waitForElement("#go-to-payment");
        // await this.page.click("#go-to-payment");
        await this.waitForElement('#go-to-shipping'); 
        await this.page.click('#go-to-shipping'); 
      }
    );

    await this.safeExecute(
      "Espera y clic del boton 'DESPACHO A DOMICILIO' ",
      async () => {
        await this.page.waitForTimeout(5000); // Espera 10 segundos
        await this.waitForElement("#shipping-option-delivery");
        await this.page.click("#shipping-option-delivery");
      }
    );

    await this.safeExecute(
      "Espera y clic del boton 'ELEGIR FECHA' ",
      async () => {
        await this.waitForElement(
          'label[for="scheduled-delivery-choose-Despacho-a domicilio"]'
        );
        await this.page.click(
          'label[for="scheduled-delivery-choose-Despacho-a domicilio"]'
        );
      }
    );

    await this.safeExecute(
      "Espera y clic del boton 'SELECCIONAR FECHA' ",
      async () => {
        const today = new Date(); // Captura la fecha actual
        const dayOfMonth = today.getDate(); // Obtiene el día del mes actual
        const newDay = (dayOfMonth + 10).toString().padStart(3, "0");
        //await this.page.click(`#shipping-data .react-datepicker__day--${newDay}`);
        await this.page
          .locator(`.react-datepicker__day--${newDay}`)
          .last()
          .click();
      }
    );

    await this.safeExecute(
      "Espera y clic del boton 'METODO DE PAGO ",
      async () => {
        await this.waitForElement('//*[@id="btn-custom-go-to-payment"]');
        await this.page.click('//*[@id="btn-custom-go-to-payment"]');
      }
    );
  }
  // async pageCarrito() {
  //   //PAGINA CARRITO POR MOVER A OTRO METODO
  //   await this.safeExecute(
  //     "Redireccion y espera de cargar todas peticiones de page carrito",
  //     () =>
  //       // Espera hasta que no haya más peticiones activas.
  //       this.page.waitForLoadState("networkidle")
  //   );
  //   await this.safeExecute(
  //     "Clic checkbox aceptar terminos y condiciones ",
  //     () => this.page.click(".icon-check-terms")
  //   );
  //   // Opcional: Espera a que el checkbox esté marcado
  //   const isChecked = await this.page.isChecked("#opt-in-terms-policies"); // Usa el selector adecuado
  //   if (isChecked) {
  //     console.warn("✅ Checkbox marcado exitosamente");
  //   } else {
  //     console.warn("❌ El checkbox NO está marcado");
  //   }
  //   //Detiene la prueba si check no esta marcado
  //   expect(isChecked).toBe(true);
  //   await this.safeExecute(
  //     "Espera y clic del boton 'FINALIZAR PEDIDO' ",
  //     async () => {
  //       await this.waitForElement('a[data-i18n="cart.finalize"]');
  //       await this.page.click('a[data-i18n="cart.finalize"]');
  //     }
  //   );
  //   this.page.on("load", async () => {
  //     console.log(
  //       "DESPUES CLIC FINALIZAR PEDIDO,se detecto recarga_page_XBORRAR"
  //     );
  //   });
  // }

  
}




    // await this.safeExecute("Clic checkbox autorizo mis datos 2", async () => {
    //   try {
    //     // Espera a que el elemento esté visible
    //     await this.waitForElement(
    //       '//*[@id="cartLoadedDiv"]/div[3]/div[3]/label[2]'
    //     );

    //     // Haz clic en el elemento
    //     await this.page.click(
    //       '//*[@id="cartLoadedDiv"]/div[3]/div[3]/label[2]'
    //     );
    //   } catch (error) {
    //     // Maneja el error específico de esta acción
    //     console.error(
    //       'Error durante "Clic checkbox autorizo mis datos 2":',
    //       error
    //     );

    //     // Puedes relanzar el error si es necesario
    //     //throw error;
    //   }
    // });
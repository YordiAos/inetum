// src/pages/loginPage.ts

import { Page } from "playwright";
import { BasePage } from "./basePage";
import { timeoutPages, timeoutElements, baseUrl } from "../utils/hooks";
import { Utils } from "../utils/utils";

export class LoginPage extends BasePage {
  private startTime = 0;
  private endTime = 0;
  //  constructor() {
  //   // Inicializamos las propiedades
  //   this.startTime = 0;
  //   this.endTime = 0;
  // }
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

  async login(correo: string, clave: string, attach: Function) {
    await this.navigate();
    attach(
      await Utils.captureAndAttachScreenshot(this.page, "Home-Screenshot"),
      "image/png"
    );

    await this.enterCredentials(correo, clave);
    attach(
      await Utils.captureAndAttachScreenshot(
        this.page,
        "Datos Login-Screenshot"
      ),
      "image/png"
    );

    await this.submitLogin();
    attach(
      await Utils.captureAndAttachScreenshot(
        this.page,
        "After Login-Screenshot"
      ),
      "image/png"
    );
  }

  async navigate() {
    console.log("Navigate to login page");
    this.startTime = performance.now();
    //la espera goto() por defecto es 30s
    await this.page.goto(baseUrl, { waitUntil: "load", timeout: timeoutPages });
    this.endTime = performance.now(); // Tiempo de fin
    console.log(
      `ESPERA .goto() PRIMERA CARGA ${
        (this.endTime - this.startTime) / 1000
      } segundos.`
    );
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

    this.startTime = performance.now();
    //la espera por defecto es indefinida(tomara el tiempo maximo de LOS STEPS)
    await this.page.waitForNavigation({
      waitUntil: "load",
      timeout: timeoutPages,
    });
    this.endTime = performance.now();
    console.log(
      `ESPERA waitForLoadState() DESPUES DE LOGIN ${
        (this.endTime - this.startTime) / 1000
      } segundos.`
    );

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

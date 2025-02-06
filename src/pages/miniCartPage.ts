import test, { expect, Page } from "playwright/test";
import { BasePage } from "./basePage";
export class MiniCartPage extends BasePage {

  private iconoCarrito = ".wongio-minicart-2-x-minicartIconContainer";
  private namePrimerProductoMiniCarrito = '[id^="name-"]';
  private buttonViewMiniCart = "#proceed-to-checkout";


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

    await Promise.all([
      // this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.waitForURL("**/checkout/#/cart", { timeout: 9999 }),
    ]);
  }
}

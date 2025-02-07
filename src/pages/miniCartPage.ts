import { timeoutPages } from "../utils/hooks";
import { BasePage } from "./basePage";
export class MiniCartPage extends BasePage {
  private iconoCarrito = ".wongio-minicart-2-x-minicartIconContainer";
  private namePrimerProductoMiniCarrito = '[id^="name-"]';
  private buttonViewMiniCart = "#proceed-to-checkout";

  async pageMinicarrito() {
    await this.safeExecute(
      "(ALEATORIO)Esperar modal aleatorio acumula sticker y puntos bonus",
      async () => {
        if (
          await this.page.isVisible(
            ".wongio-wongiocompo1app-0-x-modal__button__nopoints"
          )
        ) {
          await this.page.click(
            ".wongio-wongiocompo1app-0-x-modal__button__nopoints"
          );
        }else{
          console.log("Modal aleatorio no aparecio");
        }
      }
    );
    await this.safeExecute("Esperar icono carrito", () =>
      this.waitForElement(this.iconoCarrito)
    );

    await this.safeExecute("Clic icono carrito", async () => {
      await this.page.click(this.iconoCarrito);
    });

    await this.safeExecute("Esperar nombre primer producto ", () =>
      this.waitForElement(this.namePrimerProductoMiniCarrito)
    );
    await this.safeExecute("clic boton 'VER CARRITO' ", () =>
      this.page.click(this.buttonViewMiniCart)
    );

    await Promise.all([
      // this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.waitForURL("**/checkout/#/cart", { timeout: timeoutPages }),
    ]);
  }
}


import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomeModalServicioEntregaPage extends BasePage {
  // constructor(page: Page) {
  //   super(page);    
  // }
  private desplegableTienda=".wongio-wongiocompo1app-0-x-pickup__select";
  private buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";

  // Método para seleccionar la tienda.
  async selectStore(optionText: string): Promise<void> {
    // Espera a que aparezca el título del modal "Retiro en tienda"
    await this.waitForElement(".wongio-wongiocompo1app-0-x-pickup__title");

    // Selecciona la opción en el desplegable usando el label
    await this.page.selectOption(this.desplegableTienda, { label: optionText });

    // Espera a que se muestre el botón de confirmar
    await this.waitForElement(this.buttonConfirmarTienda);

    // Hace click en el botón de confirmar
    await this.page.click(this.buttonConfirmarTienda);
  }
}

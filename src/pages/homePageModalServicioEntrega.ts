
import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePageModalServicioEntrega extends BasePage {
  // Define los selectores como propiedades de la clase.
  readonly desplegableTienda: string;
  readonly buttonConfirmarTienda: string;

  constructor(page: Page) {
    // Se debe llamar a super() y pasar los argumentos necesarios antes de usar "this".
    super(page);
    // Inicialización de los selectores
    this.desplegableTienda = ".wongio-wongiocompo1app-0-x-pickup__select";
    this.buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";
  }

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

// home.page.ts
import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { HomePageModalServicioEntrega } from "./homePageModalServicioEntrega";

export class HomePage extends BasePage {
  // Define los selectores como propiedades de la clase.
  readonly desplegableTienda: string;
  readonly buttonConfirmarTienda: string;
  readonly homePageModalServicioEntrega: HomePageModalServicioEntrega;

  private cajaBusqueda = ".vtex-styleguide-9-x-input";
  private validarTextResultadoBusqueda =
    ".vtex-rich-text-0-x-paragraph--rto-busqueda-txt";
  private buttonAddProducto = ".vtex-button__label.border-box";
  private buttonRecogojoEnTienda =
    'button img[alt="Seleccionar Recojo en Tienda"]';
  private inputCantidadProductosHome =
    ".wongio-wongiocompo1app-0-x-numeric_stepper__input";

  constructor(page: Page) {
    // Se debe llamar a super() y pasar los argumentos necesarios antes de usar "this".
    super(page);
    this.homePageModalServicioEntrega = new HomePageModalServicioEntrega(page);

    // Inicialización de los selectores
    this.desplegableTienda = ".wongio-wongiocompo1app-0-x-pickup__select";
    this.buttonConfirmarTienda = ".wongio-wongiocompo1app-0-x-pickup__submit";
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
    
    // const homePageModalServicioEntrega = new HomePageModalServicioEntrega(
    //   this.page
    // );
    await this.homePageModalServicioEntrega.selectStore(tienda);

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
      
      console.log("📌 Texto en caja de cantidad productos:", txtCantidad);
    });
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

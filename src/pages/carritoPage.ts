
import { BasePage } from "./basePage";
export class PageCarrito extends BasePage {
    
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
      this.page.waitForURL(/.*\/checkout\/#\/(shipping|profile|testing)/, {
        timeout: 9999,
      }),
      // this.page.waitForURL('**/checkout/#/shipping'),
      // this.page.waitForURL('**/checkout/#/profile')
    ]);

    await this.safeExecute(
      "Espera y clic del boton 'METODO DE ENTREGA' ",
      async () => {
        // await this.page.waitForTimeout(5000); // remplazado por page.waitForURL
        // await this.waitForElement("#go-to-payment");
        // await this.page.click("#go-to-payment");
        await this.waitForElement("#go-to-shipping");
        await this.page.click("#go-to-shipping");
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
}

import { Page } from "playwright";

export class SovosPage {
  private readonly url =
    "https://egw401qa.paperless.com.pe/Facturacion/jsp/gestdoc/docemi/listarDocs.jsp";

  private readonly rucSelector = "input[name='rut']";
  private readonly userSelector = "input[name='usuario']";
  private readonly passwordSelector = "input[name='clave']";
  private readonly submitButtonSelector = "button[type='submit']"; // Asegúrate de que este sea el botón correcto para el login

  private readonly filterButtonSelector = "#filterButton"; // Selector para el botón de filtro, ajusta según sea necesario
  private readonly rejectedDocsListSelector = "#rejectedDocsList"; // Selector para la lista de documentos rechazados, ajusta según sea necesario
  private readonly rejectedDocumentsSelector = ".rejected-documents"; // Selector para documentos rechazados, ajusta según sea necesario

  private readonly ruc = "201090721772"; // RUC proporcionado
  private readonly user = "admin"; // Usuario proporcionado
  private readonly password = "abc123"; // Clave proporcionada

  constructor(private page: Page) {}

  // Abre la página de login y realiza el login
  async login(url: string): Promise<void> {
    await this.page.goto(url);

    // Completar los campos de login
    await this.page.fill(this.rucSelector, this.ruc);
    await this.page.fill(this.userSelector, this.user);
    await this.page.fill(this.passwordSelector, this.password);

    // Hacer clic en el botón de login
    await this.page.click('input[name="imageField"]');
    await this.page.waitForLoadState("networkidle");
  }

  // Abre la página de SOVOS (después de login)
  async openPage(): Promise<void> {
    await this.page.goto(this.url);
  }

  // Aplica el filtro para mostrar documentos rechazados
  async filterRejectedDocuments(
    status: string,
    fechaini: string
  ): Promise<void> {
    await this.page.click("#checkIdG");
    // Verificar que el checkbox esté marcado
    const isCheckedType = await this.page.isChecked("#checkIdG");
    console.log(`¿El checkbox está marcado? ${isCheckedType}`);

    await this.page.click("#checkBajaG");
    // Verificar que el checkbox esté marcado
    const isCheckedState = await this.page.isChecked("#checkBajaG");
    console.log(`¿El checkbox está marcado? ${isCheckedState}`);

    await this.page.fill("#fchemiini", fechaini);
    // Verificar que el valor se haya insertado correctamente
    const FECHA_INICIO = await this.page.inputValue("#fchemiini");
    console.log(`Valor insertado en fchemiini: ${FECHA_INICIO}`);

    await this.page.fill("#fchemifin", fechaini);
    // Verificar que el valor se haya insertado correctamente
    const FECHA_FIN = await this.page.inputValue("#fchemiini");
    console.log(`Valor insertado en fchemiini: ${FECHA_FIN}`);

    // Seleccionar la opción 'T104 - T104' basándose en el texto visible (label)
    await this.page.selectOption("#txtLocal", { label: "T104 - T104" });
    // Verificar la seleccion
    const selectedOption = await this.page.$eval("#txtLocal", (select) => {
      const selectElement = select as HTMLSelectElement;
      const selectedIndex = selectElement.selectedIndex;
      return selectElement.options[selectedIndex].text; // Devuelve el texto de la opción seleccionada
    });
    console.log(`Opción seleccionada: ${selectedOption}`); // Debería imprimir 'T104 - T104'

    // Seleccionar la opción 'T104 - T104' basándose en el texto visible (label)
    await this.page.selectOption("#estadosunat", { label: "Rechazado" });
    // Verificar la seleccion
    const selectedOptionState = await this.page.$eval(
      "#estadosunat",
      (select) => {
        const selectElement = select as HTMLSelectElement;
        const selectedIndex = selectElement.selectedIndex;
        return selectElement.options[selectedIndex].text; // Devuelve el texto de la opción seleccionada
      }
    );
    console.log(`Opción seleccionada: ${selectedOptionState}`); // Debería imprimir 'T104 - T104'
    // Hacer clic en el botón de búsqueda
    await this.page.click('input.boton[value="Buscar"]');
  }

  // Verifica que los documentos rechazados se muestren en consola
  async verifyRejectedDocuments(): Promise<void> {
    // const rejectedDocuments = await this.page.$$eval(this.rejectedDocumentsSelector, (docs) => docs.map(doc => doc.innerText));
    // if (rejectedDocuments.length === 0) {
    //   throw new Error("No se encontraron documentos rechazados.");
    // }
    // console.log("Documentos rechazados: ", rejectedDocuments);
  }

  // Opción para enviar los documentos rechazados por correo (esto depende de la implementación adicional)
  async sendRejectedDocumentsByEmail(): Promise<void> {
    // Implementa el envío por correo, si es necesario
    console.log("Enviando documentos rechazados por correo...");
    // Aquí puedes usar alguna API o lógica adicional para enviar el correo
  }
}

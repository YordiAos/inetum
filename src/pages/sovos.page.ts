import { Page } from "playwright";

export class SovosPage {
  private url!: string; // ¡Se asegura que será inicializada posteriormente!

  private readonly rucSelector = "input[name='rut']";
  private readonly userSelector = "input[name='usuario']";
  private readonly passwordSelector = "input[name='clave']";

  private readonly ruc = "201090721772"; // RUC proporcionado
  private readonly user = "admin"; // Usuario proporcionado
  private readonly password = "abc123"; // Clave proporcionada

  constructor(private page: Page) {}

  // Abre la página de login y realiza el login
  async login(url: string): Promise<void> {
    this.url = url; // Asignamos el valor de `url` a la propiedad de la clase.

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
    if (!this.url) {
      throw new Error(
        "URL no está inicializada. Llama al método 'login' primero."
      );
    }
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
    console.log(`¿El checkbox 1 está marcado? ${isCheckedType}`);

    await this.page.click("#checkBajaG");
    // Verificar que el checkbox esté marcado
    const isCheckedState = await this.page.isChecked("#checkBajaG");
    console.log(`¿El checkbox 2 está marcado? ${isCheckedState}`);

    if (validarFecha(fechaini)) {
      if (fechaini == "") {
        const fechaActual = obtenerFechaActual();
        console.log(`La fecha actual es: ${fechaActual}`);
        fechaini = fechaActual;
      }
      await this.page.fill("#fchemiini", fechaini);
      // Verificar que el valor se haya insertado correctamente
      const FECHA_INICIO = await this.page.inputValue("#fchemiini");
      console.log(`Valor insertado en fecha inicio: ${FECHA_INICIO}`);

      await this.page.fill("#fchemifin", fechaini);
      // Verificar que el valor se haya insertado correctamente
      const FECHA_FIN = await this.page.inputValue("#fchemiini");
      console.log(`Valor insertado en fecha fin: ${FECHA_FIN}`);

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
    }else{
      throw new Error("REVISAR FORMATO DE FECHA,EL CUAL ESTA INCORRECTO");
    }
  }
}

function validarFecha(fechaini: string): boolean {
  if (fechaini === "") {
    console.log("La fecha está vacía.");
    return true;
  } else if (/^\d{2}-\d{2}-\d{4}$/.test(fechaini)) {
    console.log("La fecha tiene el formato correcto (día-mes-año).");
    return true;
  } else {
    console.log("La fecha no está vacía, pero no tiene el formato correcto.");
    return false;
  }
}
function obtenerFechaActual(): string {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, "0"); // Día con dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos (0-11)
  const anio = fecha.getFullYear(); // Año completo

  return `${dia}-${mes}-${anio}`; // Formato día-mes-año
}

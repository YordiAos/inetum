import { Locator, Page } from "playwright";

export class PetProfilePage {
  page: Page;
  // Elementos de la página
  private visitDateInput="#visit-date";
  private visitDescriptionInpu="#visit-description";
  
  // Constructor donde se inicializan los elementos de la página
  constructor(page: Page) {
    this.page = page;
  }

  // Acción: Agregar una visita
  public async agregarVisita(
    fecha: string,
    descripcion: string
  ): Promise<void> {
    await this.page.click("span.fa.fa-search");
    await this.page.waitForLoadState("networkidle");
    await this.page.click('button[type="submit"]:has-text("Find Owner")');

    // await this.visitDateInput.fill(fecha); // Rellena el campo de fecha
    // await this.visitDescriptionInput.fill(descripcion); // Rellena el campo de descripción
    // await this.addVisitButton.click(); // Hace clic en el botón para agregar la visita
  }

  // Acción: Verificar si la visita aparece en la lista
  public async verificarVisitaEnLista(descripcion: string): Promise<boolean> {
    // const visitas = await this.visitsList.locator(".visit-item"); // Se asume que cada visita tiene una clase 'visit-item'
    // const count = await visitas.count(); // Cuenta el número de elementos en la lista
    // for (let i = 0; i < count; i++) {
    //   const text = await visitas.nth(i).innerText(); // Obtiene el texto de cada elemento
    //   if (text.includes(descripcion)) {
    //     return true; // Si se encuentra la descripción, devuelve verdadero
    //   }
    // }
    return false; // Si no se encuentra, devuelve falso
  }
}

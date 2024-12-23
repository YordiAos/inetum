import { Page } from "playwright";

export class OwnerProfilePage {
  page: Page;
  private searchButton = "span.fa.fa-search";
  private findOwnerButton = 'button:has-text("Find Owner")';
  private addNewPetButton = 'a:has-text("Add New Pet")';
  private ownerLink = 'a[href="/owners/1"]';

  private petNameInput = "#name";
  private birthDateInput = "#birthDate";
  private submitButton = "button.btn-primary";
  private petList = "select#type"; 

  constructor(page: Page) {
    this.page = page;
  }
  

  
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 30000 });
  }
  async navigateToOwnerProfile(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector(this.searchButton);
    await this.page.click(this.searchButton);
    await this.page.waitForURL("https://petclinic-production.up.railway.app/owners/find", { timeout: 29000 });
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector(this.findOwnerButton);
    await this.page.locator(this.findOwnerButton).click(); 
    await this.page.locator(this.ownerLink).click();
    await this.page.locator(this.addNewPetButton).click(); 
  }

 
  async addPet(petName: string, species: string, birthDate: string): Promise<void> {
    await this.fillPetName(petName);
    await this.fillPetBirthDate(birthDate);
    await this.selectPetSpecies(species);
    await this.submitPetForm();
  }

 
  private async fillPetName(petName: string): Promise<void> {
    await this.page.fill(this.petNameInput, petName);
  }

 
  private async fillPetBirthDate(birthDate: string): Promise<void> {
    await this.page.fill(this.birthDateInput, birthDate);
  }

  private async selectPetSpecies(species: string): Promise<void> {
    await this.page.locator(this.petList).selectOption({ label: species });
  }

  
  private async submitPetForm(): Promise<void> {
    await this.page.locator(this.submitButton).click();
  }

  
  async getPet(): Promise<string[]> {
    const petElements = await this.page.$$eval(
      ".dl-horizontal dd:first-of-type",
      (elements) =>
        elements
          .map((element) => element.textContent?.trim()) // Obtener el texto de cada <dd>
          .filter((text): text is string => typeof text === "string") // Filtrar solo las cadenas no undefined
    );

    return petElements;
  }
}

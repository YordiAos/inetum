import { Page } from "playwright";

export class OwnersPage {
  private readonly searchUrl = "https://petclinic-production.up.railway.app/owners/find";
  private readonly ownersTableSelector = "#owners > tbody > tr";
  private readonly ownersTableIdSelector = "#owners";

  constructor(private page: Page) {}

  async verifyOwnersList(): Promise<void> {
    await this.page.waitForSelector(this.ownersTableIdSelector); 

    const ownersCount = await this.page.$$eval(this.ownersTableSelector, (rows) => rows.length);

    if (ownersCount === 0) {
      throw new Error("No se encontraron propietarios.");
    }

    console.log(`Se encontraron ${ownersCount} propietario(s).`);
  }

  async searchForOwners(): Promise<void> {
    await this.page.click("span.fa.fa-search"); 
    await this.page.waitForURL(this.searchUrl, { timeout: 30000 }); 
    await this.page.click('button[type="submit"]:has-text("Find Owner")'); 
  }
}

import { Page } from "playwright";
import assert from 'assert';

export class CrearOwnerPage {
  private readonly urlOwnersPage = "https://petclinic-production.up.railway.app/owners/find";
  private readonly addNewOwnerSelector = 'a[href="/owners/new"]';
  private readonly ownerNameSelector = "xpath=/html/body/div/div/table[1]/tbody/tr[1]/td/b";
  private readonly firstNameSelector = 'input[name="firstName"]';
  private readonly lastNameSelector = 'input[name="lastName"]';
  private readonly addressSelector = 'input[name="address"]';
  private readonly citySelector = 'input[name="city"]';
  private readonly telephoneSelector = 'input[name="telephone"]';
  private readonly submitButtonSelector = 'button[type="submit"]';

  constructor(private page: Page) {}


  async navigateToFindOwnersPage(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 30000 });
  }


  async clickAddNewOwner(): Promise<void> {
    await this.page.click("span.fa.fa-search"); 
    await this.page.waitForURL(this.urlOwnersPage, { timeout: 29000 });
    await this.page.click(this.addNewOwnerSelector); 
  }

  async fillNewOwnerForm(ownerData: Record<string, string>): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await this.page.fill(this.firstNameSelector, ownerData.firstName);
    await this.page.fill(this.lastNameSelector, ownerData.lastName);
    await this.page.fill(this.addressSelector, ownerData.address);
    await this.page.fill(this.citySelector, ownerData.city);
    await this.page.fill(this.telephoneSelector, ownerData.telephone);
    await this.page.click(this.submitButtonSelector); 
  }

  async verifyOwnerInList(fullName: string): Promise<void> {
    await this.page.waitForSelector(this.ownerNameSelector); 
    const ownerName = await this.page.$eval(this.ownerNameSelector, (element) => element.textContent?.trim());
    assert.strictEqual(ownerName, fullName, `Owner with name "${fullName}" not found!`);
  }
}

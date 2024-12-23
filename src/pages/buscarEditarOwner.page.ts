import { Page } from "playwright";

export class BuscarEditarOwnerPage {
  private readonly searchIconSelector = "span.fa.fa-search";
  private readonly lastNameInputSelector = "#lastName";
  private readonly findOwnerButtonSelector = 'button:has-text("Find Owner")';
  private readonly firstOwnerSelector =
    '#owners tbody tr:nth-child(1) a[href^="/owners/"]';
  private readonly editButtonSelector = 'a:has-text("Edit Owner")';
  private readonly ownerNameInputSelector = 'input[name="firstName"]';
  private readonly updateOwnerButtonSelector =
    'button[type="submit"]:has-text("Update Owner")';
  private readonly ownerNameLocator =
    "xpath=/html/body/div/div/table[1]/tbody/tr[1]/td/b";

  constructor(private page: Page) {}

  async navigateToFindOwnerPage(): Promise<void> {
    await this.page.click(this.searchIconSelector);
  }

  async searchOwner(searchText: string): Promise<void> {
    await this.page.fill(this.lastNameInputSelector, searchText);
    await this.page.click(this.findOwnerButtonSelector); 
  }

  async selectFirstOwner(): Promise<void> {
    await this.page.click(this.firstOwnerSelector);
  }

  async clickEditButton(): Promise<void> {
    await this.page.click(this.editButtonSelector);
  }

  async changeOwnerName(newName: string): Promise<void> {
    await this.page.fill(this.ownerNameInputSelector, newName);
    await this.page.click(this.updateOwnerButtonSelector);
  }

  async verifyUpdatedOwnerName(newName: string): Promise<void> {
    const ownerNameLocatorText = await this.page
      .locator(this.ownerNameLocator)
      .textContent();

    if (!ownerNameLocatorText || !ownerNameLocatorText.includes(newName)) {
      throw new Error(
        `Owner name was not updated correctly. Expected: ${newName}, Found: ${ownerNameLocatorText}`
      );
    }
    console.log("Owner name updated successfully:", ownerNameLocatorText);
  }
}

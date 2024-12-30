import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { OwnersPage } from "../pages/listaOwners.page";
import { getEnvironmentUrl } from "../../config";
import { BasePage } from "../pages/basePage";

let browser: Browser;
let page: Page;
let ownersPage: OwnersPage;
let basePage: BasePage;

Given("I navigate to the Petclinic home page", async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  ownersPage = new OwnersPage(page);
  
  basePage = new BasePage(page);
  const URL = getEnvironmentUrl("URL");
  await basePage.navigateTo(URL);
});

When('I access the "Owners" section', async () => {
  await ownersPage.searchForOwners();
});

Then("I should see a list of registered pet owners", async () => {
  await ownersPage.verifyOwnersList();
  await browser.close();
});

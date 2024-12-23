import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { CrearOwnerPage } from "../pages/crearOwner.page";
import { getEnvironmentUrl } from "../../config";

let browser: Browser;
let page: Page;
let crearOwnerPage: CrearOwnerPage;


const URL = getEnvironmentUrl("URL");

Given('I am on the "Find Owners" page', async () => {

  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  crearOwnerPage = new CrearOwnerPage(page);
  await crearOwnerPage.navigateToFindOwnersPage(URL);
});

When('I select "Add New Owner"', async () => {
  await crearOwnerPage.clickAddNewOwner();
  console.log("CLIC EN NUEVO");
});

When("I fill out the form with valid owner information", async (table) => {
  const ownerDataList = table.hashes(); 
  for (const ownerData of ownerDataList) {
    console.log("ownerData:", ownerData);
    await crearOwnerPage.fillNewOwnerForm(ownerData);
  }
});

Then("verify owner created", async (table) => {
  const ownerDataList = table.hashes(); 
  for (const ownerData of ownerDataList) {
    const fullName = `${ownerData.firstName} ${ownerData.lastName}`;
    await crearOwnerPage.verifyOwnerInList(fullName);
  }
  await browser.close();
});

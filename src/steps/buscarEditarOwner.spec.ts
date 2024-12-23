import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { BuscarEditarOwnerPage } from '../pages/buscarEditarOwner.page'; 
import { getEnvironmentUrl } from '../../config';
import { BasePage } from '../pages/basePage';

let browser: Browser;
let page: Page;
let basePage:BasePage;
let buscarEditarOwnerPage: BuscarEditarOwnerPage;

// Inicializa el navegador y la página para los tests
const initializeBrowserAndPage = async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  basePage = new BasePage(page);
  buscarEditarOwnerPage = new BuscarEditarOwnerPage(page);
};

Given('I navigate to the "Find Owners" page', async () => {
  await initializeBrowserAndPage();
  
});

When('I search for an owner {string}', async (searchText: string) => {
  const environmentUrl = getEnvironmentUrl("URL");
  await basePage.navigateTo(environmentUrl);
  await buscarEditarOwnerPage.navigateToFindOwnerPage();
  await buscarEditarOwnerPage.searchOwner(searchText);
});

When('I click on the "Edit" button for the owner', async () => {
  await buscarEditarOwnerPage.selectFirstOwner();
  await buscarEditarOwnerPage.clickEditButton();
});

When('I change the owner name to {string}', async (newName: string) => {
  await buscarEditarOwnerPage.changeOwnerName(newName);
});

Then('the owner name should be updated in the owner list {string}', async (updatedName: string) => {
  await buscarEditarOwnerPage.verifyUpdatedOwnerName(updatedName);
  await browser.close();
});

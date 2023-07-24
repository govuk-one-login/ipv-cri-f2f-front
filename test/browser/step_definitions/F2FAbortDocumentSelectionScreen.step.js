const { Given, When, Then } = require("@cucumber/cucumber");

const {PhotoIdSelectionPage} = require("../pages");

  Given(/^I do not have any of these documents option is selected$/, async function () {
     const photoIdPage = new PhotoIdSelectionPage(await this.page);

     await photoIdPage.NoDocumentsChoice();

  });

  

  When(/^the user clicks the continue button$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });


const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const {PhotoIdSelectionPage, EEAIdentityCardDetailsPageValid } = require("../pages");

  Given(/^the EEA National Identity Card option is selected$/, async function () {     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);

     await photoIdPage.nationalIdentityCardEEAChoice();
	
  });

  When(/^the user clicks the PhotoId continue button with EEA National Identity Card selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    await photoIdPage.continue();

  });

  Then(/^the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

  });
  
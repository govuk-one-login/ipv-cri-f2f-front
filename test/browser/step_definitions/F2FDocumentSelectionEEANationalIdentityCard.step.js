const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const {PhotoIdSelectionPage, EEAIdentityCardDetailsPageValid, EeaIdentityCardHasExpiryDatePage } = require("../pages");

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

  Then(/^the user is routed to the EEA Has Expiry Entry Screen$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);
  
    expect(await eeaIdentityCardHasExpiryDatePage.isCurrentPage()).to.be.true;
  
  });

  Then(/^the user is routed to the EEA edit HAS Expiry Entry Screen$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);

    expect(await eeaIdentityCardHasExpiryDatePage.isCurrentEditPage()).to.be.true;
  
  });

  When(/^the user selects yes on the EEA identity expiry date page$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);
  
    await eeaIdentityCardHasExpiryDatePage.yes();
    await eeaIdentityCardHasExpiryDatePage.continue();
  
  });


  When(/^the user selects no on the EEA identity expiry date page$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);

     await eeaIdentityCardHasExpiryDatePage.no();
     await eeaIdentityCardHasExpiryDatePage.continue();

  });
  
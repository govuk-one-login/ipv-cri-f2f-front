const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPageValid, NonUKPassportCountrySelector} = require("../pages");

  Given(/^the date entered is within accepted Non UK expiration window$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    await nonUKPassportDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK passport page$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

    await nonUKPassportDetails.continue();
  
  });
  

  Then(/^the user is routed to the Country of Issue Selector screen$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

  });

const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPageValid, FindBranch} = require("../pages");

  Given(/^the date entered is within accepted Non UK expiration window$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    await nonUKPassportDetails.expiryDate();

  });

  When(/^the user clicks the continue button on the Non UK passport page$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

    await nonUKPassportDetails.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the NonUKPassport journey - Branch Finder$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });

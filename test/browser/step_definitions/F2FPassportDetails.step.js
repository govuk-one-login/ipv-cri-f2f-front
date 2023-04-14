const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPageValid, FindBranch} = require("../pages");

  Given(/^the date entered is within accepted UK Passport expiration window$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
  
    await passportDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPassportPage$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
  
    expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the journey Branch Finder Screen$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });

  
  Then(/^the user enters a valid postcode$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    await branchFinderPage.postCode();

  });

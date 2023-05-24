const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPageValid, FindBranch, NonUKPassportCountrySelector} = require("../pages");

  Given(/^the date entered is within accepted Non UK expiration window$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    await nonUKPassportDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK passport page$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

    await nonUKPassportDetails.continue();
  
  });


  Then(/^they are routed to the NonUKPassport Branch Finder screen$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });


  Given(/^the user is on the Country Code Selection screen$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

  });
 
  

  Then(/^the user is routed to the Country of Issue Selector screen$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    // expect(await ctrySelector.isCurrentPage()).to.be.true;

  });


  When(/^the user selects a country$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

    await ctrySelector.selectCountry();

    await ctrySelector.continue();

  });


  When(/^the user clicks continue without selecting a country$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

    await ctrySelector.continue();

    expect(await ctrySelector.checkErrorText()).to.contain('There is a problem');

  });


  Then(/^an inline error message is displayed$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

    expect(await ctrySelector.checkErrorText()).to.contain('There is a problem');

  });

  When(/^the Back link is clicked on the NonUKPassport Country selection page$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);
  
    await ctrySelector.back();
  
  });

  Then(/^the user is navigated back to the previous screen - the Photo ID Expiry page$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;
  
  });
  
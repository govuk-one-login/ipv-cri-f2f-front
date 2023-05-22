const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, EuDrivingLicenceCountrySelector} = require("../pages");

  Given(/^the user selects a country from the drop down menu$/, async function () {
    const countrySelector = new EuDrivingLicenceCountrySelector(await this.page);

    await countrySelector.selectCountry();
  });


  When(/^the user clicks the continue button on the EU country code page$/, async function () {
    const countrySelector = new EuDrivingLicenceCountrySelector(await this.page);

    await countrySelector.continue();
  
  });
  


  Then(/^the user is routed from EU DL country code to Branch Finder Screen$/, async function () {
    const branchFinder = new FindBranch(await this.page);

    expect(await branchFinder.isCurrentPage()).to.be.true;

  });

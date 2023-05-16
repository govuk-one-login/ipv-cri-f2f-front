const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EuDrivingLicenceDetailsPageValid, FindBranch, EuDrivingLicenseCountrySelector} = require("../pages");

  Given(/^the EU Driving Licence date entered is within accepted expiration window$/, async function () {
    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);
  
    await euDrivingLicenceDetailsPage.expiryDate();

  });

  Given(/^the user is on the EU Country Code Selection screen$/, async function () {

  });


  When(/^the user clicks the continue button on the EU Driving Licence details page$/, async function () {
    const euDrivingLicenceChoice = new EuDrivingLicenceDetailsPageValid(await this.page);

    await euDrivingLicenceChoice.continue();
  
  });
  

  When(/^the user selects an EU country code$/, async function () {
    const euCtrySelector = new EuDrivingLicenseCountrySelector(await this.page);

    expect(await euCtrySelector.isCurrentPage()).to.be.true;

    await euCtrySelector.selectCountry();

    await euCtrySelector.continue();

  });


  Then(/^the user is routed from EU DL Details to the Country Code selector page$/, async function () {
    const ctrySelector = new EuDrivingLicenseCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

  });



  Then(/^the user is routed from EU DL Details to Branch Finder Screen$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });
const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EuDrivingLicenceDetailsPageValid, FindBranch } = require("../pages");

  Given(/^the EU Driving Licence date entered is within accepted expiration window$/, async function () {
    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);
  
    await euDrivingLicenceDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the EU Driving Licence details page$/, async function () {
    const euDrivingLicenceChoice = new EuDrivingLicenceDetailsPageValid(await this.page);

    await euDrivingLicenceChoice.continue();
  
  });
  

  Then(/^the user is routed from EU DL Details to Branch Finder Screen$/, async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });
  
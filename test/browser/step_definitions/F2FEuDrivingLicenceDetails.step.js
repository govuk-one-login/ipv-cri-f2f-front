const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");
const { add } = require("hmpo-app/middleware/linked-files");

const { EuDrivingLicenceDetailsPageValid, EuDrivingLicenceAddressCheck, EuDrivingLicenceCountrySelector} = require("../pages");

  Given(/^the EU Driving Licence date entered is within accepted expiration window$/, async function () {
    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);
  
    await euDrivingLicenceDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the EU Driving Licence details page$/, async function () {
    const euDrivingLicenceChoice = new EuDrivingLicenceDetailsPageValid(await this.page);

    await euDrivingLicenceChoice.continue();
  
  });
  


  Then(/^the user is routed from EU DL Details to the address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

  });

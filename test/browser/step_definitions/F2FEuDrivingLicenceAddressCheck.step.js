const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");
const { add } = require("hmpo-app/middleware/linked-files");

const { EuDrivingLicenceAddressCheck, EuDrivingLicenceCountrySelector, PhotoIdSelectionPage} = require("../pages");

  Given(/^the user selects Yes, it has my current address on it$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    await addressCheck.sameAddress();

  });
  
  Given(/^the user selects My driving licence does not have my address on it$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    await addressCheck.noAddress();

  });

  Given(/^the user selects No, it has my previous address on it$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    await addressCheck.differentAddress();

  });


  When(/^the user clicks continue on the EU Driving Licence address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    await addressCheck.continue();
  
  });
  


  Then(/^they are routed to the country code selection screen$/, async function () {
    const countryCodes = new EuDrivingLicenceCountrySelector(await this.page);

    expect(await countryCodes.isCurrentPage()).to.be.true;

  });

  Then(/^they are routed back to the Document Selection screen$/, async function () {
    const documentSelection = new PhotoIdSelectionPage(await this.page);

    expect(await documentSelection.isCurrentPage()).to.be.true;

  });

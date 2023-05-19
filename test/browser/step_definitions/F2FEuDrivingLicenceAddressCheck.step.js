const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EuDrivingLicenceAddressCheck, EuDrivingLicenceCountrySelector, PhotoIdSelectionPage, EuDrivingLicenceDetailsPageValid} = require("../pages");

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

  Given(/^no option has been chosen on the EU DL Address Check screen$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    expect(await addressCheck.isCurrentPage()).to.be.true;

  });

  Given(/^the user is on the EU DL address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    expect(await addressCheck.isCurrentPage()).to.be.true;

  });



  When(/^the user clicks continue on the EU Driving Licence address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    await addressCheck.continue();
  
  });

  When(/^they click the EU DL address check back button$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    await addressCheck.back();
  
  });
  


  Then(/^they are routed to the country code selection screen$/, async function () {
    const countryCodes = new EuDrivingLicenceCountrySelector(await this.page);

    expect(await countryCodes.isCurrentPage()).to.be.true;

  });

  Then(/^they are routed back to the Document Selection screen$/, async function () {
    const documentSelection = new PhotoIdSelectionPage(await this.page);

    expect(await documentSelection.isCurrentPage()).to.be.true;

  });

  Then(/^they are routed back to the EU DL expiry date page$/, async function () {
    const euDlDetails = new EuDrivingLicenceDetailsPageValid(await this.page);

    expect(await euDlDetails.isCurrentPage()).to.be.true;

  });

  Then(/^the user sees an inline error message displayed on the EU DL address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    expect(await addressCheck.isCurrentPage()).to.be.true;
  
    expect(await addressCheck.checkErrorText()).to.contain('There is a problem');

  });

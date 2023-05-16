const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");
const { add } = require("hmpo-app/middleware/linked-files");

const { EuDrivingLicenceAddressCheck, EuDrivingLicenceCountrySelector} = require("../pages");

  Given(/^the user selects Yes, it has my current address on it$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);
  
    await addressCheck.sameAddress();

  });


  When(/^the user clicks continue on the EU Driving Licence address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    await addressCheck.continue();
  
  });
  


  Then(/^they are routed to the country code selection screen$/, async function () {
    const countryCodes = new EuDrivingLicenceCountrySelector(await this.page);

    expect(await countryCodes.isCurrentPage()).to.be.true;

  });



  // Then(/^the user is routed from EU DL Details to Branch Finder Screen$/, async function () {
  //   const branchFinderPage = new FindBranch(await this.page);

  //   expect(await branchFinderPage.isCurrentPage()).to.be.true;

  // });
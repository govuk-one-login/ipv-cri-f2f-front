const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, EuDrivingLicenceDetailsPageValid, EuDrivingLicenceHasExpiryDatePage } = require("../pages");

  Given(/^the EU driving licence option is selected$/, async function () { 
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.euDrivingLicenceChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  When(/^the user clicks the EU driving licence button$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });

  Then(/^the user is routed to the EU DL Has Expiry Entry Screen$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
  
    expect(await euDrivingLicenceHasExpiryDatePage.isCurrentPage()).to.be.true;
  
  });

  Then(/^the user is routed to the EU DL edit Has Expiry Entry Screen$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
  
    expect(await euDrivingLicenceHasExpiryDatePage.isCurrentEditPage()).to.be.true;
  
  });

  When(/^the user selects yes on the eu driving licence expiry date page$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
  
    await euDrivingLicenceHasExpiryDatePage.yes();
    await euDrivingLicenceHasExpiryDatePage.continue();
  
  });


  When(/^the user selects no on the eu driving licence expiry date page$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);

     await euDrivingLicenceHasExpiryDatePage.no();
     await euDrivingLicenceHasExpiryDatePage.continue();

  });
  
  Then(/^the user is routed to the EU DL Expiry Entry Screen$/, async function () {
    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);

    expect(await euDrivingLicenceDetailsPage.isCurrentPage()).to.be.true;

  });
  
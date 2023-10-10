const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, EuDrivingLicenceDetailsPageValid, EuDrivingLicenceHasExpiryDatePage,EuDrivingLicenceAddressCheck, FindBranch, EuDrivingLicenceCountrySelector } = require("../pages");

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
  
//EUDrivingLicenceDetails

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
  

  Then(/^the user is routed from EU DL Details to the address check page$/, async function () {
    const addressCheck = new EuDrivingLicenceAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

  });

  //EuDrivingLicenceCountryCode
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

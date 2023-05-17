const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, EEAIdentityCardDetailsPageValid, PhotoIdSelectionPage, EEAIdentityCardCountrySelectorPage, EEAIdentityCardCountryAddressCheck} = require("../pages");

  Given(/^the date entered is within accepted National Identity Card EEA expiration window$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.expiryDate();

  });

  Given(/^the user selects Yes, it has my current address on it$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.sameAddress();

  });

  Given(/^the user selects My driving licence does not have my address on it$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.noAddress();

  });

  When(/^the user clicks the continue button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.continue();

  });

  When(/^the user clicks the Back button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.back();

  });

  When(/^the user clicks continue on the EEA Identity Card address check page$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.continue();

  });

  Then(/^the user is routed to the next screen in the National Identity Card EEA journey - Find Branch$/, async function () {
        const branchFinderPage = new FindBranch(await this.page);

        expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });


  Then(/^the user is routed from NI Card EEA Details to the address check page$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

  });



  Then(/^the user is routed to the previous screen in the NIC EEA journey$/, async function (){
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;

  });
  
  Then(/^they are routed to the country code selection screen$/, async function (){
    const countryCode = new EEAIdentityCardCountrySelectorPage(await this.page);

    expect(await countryCode.isCurrentPage()).to.be.true;

  });
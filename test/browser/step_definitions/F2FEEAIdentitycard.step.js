const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");


const { FindBranch, EEAIdentityCardDetailsPageValid, PhotoIdSelectionPage, EEAIdentityCardCountrySelectorPage, EEAIdentityCardCountryAddressCheck} = require("../pages");

  Given(/^the date entered is within accepted National Identity Card EEA expiration window$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.expiryDate();

  });

  Given(/^the user selects Yes, it has my current address on it for EEA ID$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.sameAddress();

  });

  Given(/^the user selects No, it has my previous address on it for EEA ID$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.differentAddress();

  });

  Given(/^the user selects My identity card does not have my address on it$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    await addressCheck.noAddress();

  });

  Given(/^the user is on the EEA ID address check page$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

  });

  Given(/^no option has been chosen on the National Identity Card EEA Address Check screen$/, async function () {
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

  });

  When(/^the user clicks the continue button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.continue();

  });

  When(/^the user clicks the Back button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardCountryAddressCheck(await this.page);

    await nationalIdentityCardEEA.back();

  });

  When(/^they click the EEA ID address check back button$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardCountryAddressCheck(await this.page);

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
  
  Then(/^they are routed to the EEA ID country code selection screen$/, async function (){
    const countryCode = new EEAIdentityCardCountrySelectorPage(await this.page);

    expect(await countryCode.isCurrentPage()).to.be.true;

  });

  Then(/^they are routed back to the Document Selection screen from EEA ID address check$/, async function (){
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;

  });

  Then(/^they are routed back to the EEA ID expiry date page$/, async function (){
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

  });

  Then(/^the user sees an inline error message displayed on the National Identity Card EEA address check page$/, async function (){
    const addressCheck = new EEAIdentityCardCountryAddressCheck(await this.page);
  
    expect(await addressCheck.isCurrentPage()).to.be.true;
  
    expect(await addressCheck.checkErrorText()).to.contain('There is a problem');

  });
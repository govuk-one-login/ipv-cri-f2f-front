const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, EEAIdentityCardDetailsPageValid, PhotoIdSelectionPage, EEAIdentityCardCountrySelectorPage} = require("../pages");

  Given(/^the date entered is within accepted National Identity Card EEA expiration window$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.expiryDate();

  });

  When(/^the user clicks the continue button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.continue();

  });

  When(/^the user clicks the Back button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(await this.page);

    await nationalIdentityCardEEA.back();

  });

  Then(/^the user is routed to the next screen in the National Identity Card EEA journey - Find Branch$/, async function () {
        const branchFinderPage = new FindBranch(await this.page);

        expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });


  Then(/^the user is routed from NI Card EEA Details to the Country Code selector page$/, async function () {
    const ctrySelector = new EEAIdentityCardCountrySelectorPage(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

  });



  Then(/^the user is routed to the previous screen in the NIC EEA journey$/, async function (){
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;

  });
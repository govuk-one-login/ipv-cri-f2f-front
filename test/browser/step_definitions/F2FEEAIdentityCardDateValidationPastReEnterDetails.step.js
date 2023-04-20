const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, EEAIdentityCardDetailsPageValid, } = require("../pages");

Given(/^the ReEnterEEAIDDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the EEAID Expiry Date screen$/, async function () {
  const eEAIdentityCardDetailsPageValid = new EEAIdentityCardDetailsPageValid(await this.page);

  expect(await eEAIdentityCardDetailsPageValid.isCurrentPage()).to.be.true;

});
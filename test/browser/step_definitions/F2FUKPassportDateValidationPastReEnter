const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, PassportDetailsPageValid, } = require("../pages");

Given(/^the ReEnterUKPassportDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks UKPassport Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the UK passport Expiry Date screen$/, async function () {
  const passportDetailsPageValid = new PassportDetailsPageValid(await this.page);

  expect(await passportDetailsPageValid.isCurrentPage()).to.be.true;

});
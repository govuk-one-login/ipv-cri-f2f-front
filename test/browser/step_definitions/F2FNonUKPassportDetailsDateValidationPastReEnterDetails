const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, NonUKPassportDetailsPageValid, } = require("../pages");

Given(/^the ReEnterNonUKPassportDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks NonUKPassport Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the Non UK passport Expiry Date screen$/, async function () {
  const nonUKPassportDetailsPageValid = new NonUKPassportDetailsPageValid(await this.page);

  expect(await nonUKPassportDetailsPageValid.isCurrentPage()).to.be.true;

});
const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, BRPDetailsPageValid, } = require("../pages");

Given(/^the ReEnterBRPDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks BRP Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the BRP Expiry Date screen$/, async function () {
  const bRPDetailsPageValid = new BRPDetailsPageValid(await this.page);

  expect(await bRPDetailsPageValid.isCurrentPage()).to.be.true;

});
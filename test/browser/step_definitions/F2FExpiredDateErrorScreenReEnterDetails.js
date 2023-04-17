const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, PhotoDlDetailsPageValid, } = require("../pages");

Given(/^the ReEnterDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ProveIdentityAnotherWay();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the UKPhotoDL Expiry Date screen$/, async function () {
  const photoDlDetailsPageValid = new PhotoDlDetailsPageValid(await this.page);

  expect(await photoDlDetailsPageValid.isCurrentPage()).to.be.true;

});
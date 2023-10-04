const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, PhotoIdSelectionPage, } = require("../pages");

Given(/^the ChooseDifferentPhotoId option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ChooseDifferentPhotoId();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});

When(/^the user clicks the Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the PhotoId Selection screen$/, async function () {
  const photoIdSelectionPage = new PhotoIdSelectionPage(await this.page);

  expect(await photoIdSelectionPage.isCurrentPage()).to.be.true;

});
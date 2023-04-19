const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoIdExpiryPage, EuDrivingLicenceDetailsPageValid, } = require("../pages");

Given(/^the ReEnterEUDLDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true

});


When(/^the user clicks EUDL Expired Date Error Screen continue button$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.continue();

});

Then(/^the user is routed back to the EU Driving Licence Expiry Date screen$/, async function () {
  const euDrivingLicenceDetailsPageValid = new EuDrivingLicenceDetailsPageValid(await this.page);

  expect(await euDrivingLicenceDetailsPageValid.isCurrentPage()).to.be.true;

});
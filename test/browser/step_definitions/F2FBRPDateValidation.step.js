const { Given, When, Then, And } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  BRPDetailsPageValid,
  BRPDetailsPageInvalidPast,
  BRPDetailsPageInvalidFuture,
  PhotoIdExpiryPage,
} = require("../pages");

Given(
  /^the date entered is before the accepted BRP expiration window$/,
  async function () {
    const brp = new BRPDetailsPageInvalidPast(await this.page);

    await brp.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the BRPPast page$/,
  async function () {
    const brp = new BRPDetailsPageInvalidPast(await this.page);

    expect(await brp.isCurrentPage()).to.be.true;

    await brp.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the BRP Page$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  }
);

//BRP Expiry Future Date
Given(
  /^the date entered is beyond the accepted BRP expiration window$/,
  async function () {
    const brp = new BRPDetailsPageInvalidFuture(await this.page);

    await brp.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the BRPFuture page$/,
  async function () {
    const brp = new BRPDetailsPageInvalidFuture(await this.page);

    expect(await brp.isCurrentPage()).to.be.true;

    await brp.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the BRP Page$/,
  async function () {
    const brp = new BRPDetailsPageInvalidFuture(await this.page);

    expect(await brp.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await brp.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//BRP Expiry Date Past Re-enter
Given(/^the ReEnterBRPDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks BRP Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the BRP Expiry Date screen$/,
  async function () {
    const bRPDetailsPageValid = new BRPDetailsPageValid(await this.page);

    expect(await bRPDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

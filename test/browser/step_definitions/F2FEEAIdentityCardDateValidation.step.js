const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  EEAIdentityCardDetailsPageValid,
  EEAIdentityCardDetailsPageInvalidPast,
  EEAIdentityCardDetailsPageInvalidFuture,
  PhotoIdExpiryPage,
} = require("../pages");

Given(
  /^the date entered is before the accepted National Identity Card EEA expiration window$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageInvalidPast(
      await this.page
    );

    await nationalIdentityCardEEA.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the National Identity Card EEA Past details Page$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageInvalidPast(
      await this.page
    );

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

    await nationalIdentityCardEEA.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the National Identity Card EEA Screen$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  }
);

//NIC EEA Expiry Date Future
Given(
  /^the date entered is beyond the accepted National Identity Card EEA expiration window$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageInvalidFuture(
      await this.page
    );

    await nationalIdentityCardEEA.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the National Identity Card EEA Future details Page$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageInvalidFuture(
      await this.page
    );

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

    await nationalIdentityCardEEA.continue();
  }
);

Then(
  /^the user sees an inline error on the National Identity Card EEA Screen$/,
  async function () {
    const niEEA = new EEAIdentityCardDetailsPageInvalidFuture(await this.page);

    expect(await niEEA.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";
    const error = await niEEA.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//NIC EEA Past date Validation Re-enter
Given(/^the ReEnterEEAIDDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the EEAID Expiry Date screen$/,
  async function () {
    const eEAIdentityCardDetailsPageValid = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    expect(await eEAIdentityCardDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

const { Given, When, Then, And } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  PassportDetailsPageValid,
  PassportDetailsPageInvalidFuture,
  PassportDetailsPageInvalidPast,
  PhotoIdExpiryPage,
} = require("../pages");

Given(/^the date entered is more than 10 years from today$/, async function () {
  const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);

  await ukPassport.expiryDateDay();
});

When(
  /^the user clicks the continue button on the UK Passport page$/,
  async function () {
    const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);

    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the UK Passport Page$/,
  async function () {
    const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);

    expect(await ukPassport.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await ukPassport.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//************Invalid Date Past
Given(
  /^the date entered is more than 18 months in the past$/,
  async function () {
    const ukPassport = new PassportDetailsPageInvalidPast(await this.page);

    await ukPassport.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the UK passport page$/,
  async function () {
    const ukPassport = new PassportDetailsPageInvalidPast(await this.page);

    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the UK passport screen$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  }
);

//************ Re-enter Invalid Date Past
Given(/^the ReEnterUKPassportDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks UKPassport Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the UK passport Expiry Date screen$/,
  async function () {
    const passportDetailsPageValid = new PassportDetailsPageValid(
      await this.page
    );

    expect(await passportDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

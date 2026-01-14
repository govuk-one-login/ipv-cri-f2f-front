const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  NonUKPassportDetailsPageValid,
  NonUKPassportDetailsPageInvalidPast,
  NonUKPassportDetailsPageInvalidFuture,
  PhotoIdExpiryPage,
} = require("../pages");

Given(
  /^the date entered is before the accepted Non UK Passport expiration window$/,
  async function () {
    const NonUKPassport = new NonUKPassportDetailsPageInvalidPast(
      await this.page
    );

    await NonUKPassport.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the Non UK Passport Past page$/,
  async function () {
    const NonUKPassport = new NonUKPassportDetailsPageInvalidPast(
      await this.page
    );

    expect(await NonUKPassport.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await NonUKPassport.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the Non UK passport screen$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

//NonUK Passport Future Date Validation
Given(
  /^the date entered is beyond the accepted Non UK Passport expiration window$/,
  async function () {
    const NonUKPassport = new NonUKPassportDetailsPageInvalidFuture(
      await this.page
    );

    await NonUKPassport.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the Non UK Passport Future page$/,
  async function () {
    const NonUKPassport = new NonUKPassportDetailsPageInvalidFuture(
      await this.page
    );

    expect(await NonUKPassport.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await NonUKPassport.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the Non UK Passport Page$/,
  async function () {
    const nonUKPassport = new NonUKPassportDetailsPageInvalidFuture(
      await this.page
    );

    expect(await nonUKPassport.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await nonUKPassport.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//NonUK Passport Past Date Validation Re-enter
Given(
  /^the ReEnterNonUKPassportDetails option is selected$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.ReEnterDetails();

    expect(await photoExpiryPage.isCurrentPage()).to.be.true;
  }
);

When(
  /^the user clicks NonUKPassport Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the Non UK passport Expiry Date screen$/,
  async function () {
    const nonUKPassportDetailsPageValid = new NonUKPassportDetailsPageValid(
      await this.page
    );

    expect(await nonUKPassportDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

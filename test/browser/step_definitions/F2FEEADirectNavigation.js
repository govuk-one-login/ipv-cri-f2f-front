const { Given, Then } = require("@cucumber/cucumber");

const {
  EeaIdentityCardHasExpiryDatePage,
  EEAIdentityCardAddressCheck,
  EEAIdentityCardCountrySelectorPage,
  EEAIdentityCardDetailsPageValid,
  EEAIdentityCardDetailsPageInvalidPast,
  EEAIdentityCardDetailsPageInvalidFuture,
  EEAIdentityCardAddressCheckEdit,
  EEAIdentityCardCountrySelectorPageEdit,
  ErrorPage,
} = require("../pages");
const { expect } = require("chai");

Given(
  /^the user navigates directly to national-identity-card-expiry-date page$/,
  async function () {
    const eeaExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(this.page);
    await eeaExpiryDatePage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the national-identity-card-expiry-date page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to select-country-national-identity-card page$/,
  async function () {
    const eeaCountrySelectPage = new EEAIdentityCardCountrySelectorPage(
      this.page
    );
    await eeaCountrySelectPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the select-country-national-identity-card page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to national-identity-card-current-address page$/,
  async function () {
    const eeaAddressCheckPage = new EEAIdentityCardAddressCheck(this.page);
    await eeaAddressCheckPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the national-identity-card-current-address page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to national-identity-card-expire-invalidpast page$/,
  async function () {
    const eeaCardDetailsInvalidPast = new EEAIdentityCardDetailsPageInvalidPast(
      this.page
    );
    await eeaCardDetailsInvalidPast.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the national-identity-card-expire-invalidpast page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to national-identity-card-expire-invalidfuture page$/,
  async function () {
    const eeaCardDetailsInvalidFuture =
      new EEAIdentityCardDetailsPageInvalidFuture(this.page);
    await eeaCardDetailsInvalidFuture.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the national-identity-card-expire-invalidfuture page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to national-identity-card-expire page$/,
  async function () {
    const eeaCardDetailsValid = new EEAIdentityCardDetailsPageValid(this.page);
    await eeaCardDetailsValid.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the national-identity-card-expire page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to eu-driving-licence-current-address-edit page$/,
  async function () {
    const eeaAddressCheckEditPage = new EEAIdentityCardAddressCheckEdit(
      this.page
    );
    await eeaAddressCheckEditPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the eu-driving-licence-current-address-edit page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to euDrivingLicenceCountrySelector-edit page$/,
  async function () {
    const eeaCountrySelectorEditPage =
      new EEAIdentityCardCountrySelectorPageEdit(this.page);
    await eeaCountrySelectorEditPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the euDrivingLicenceCountrySelector-edit page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

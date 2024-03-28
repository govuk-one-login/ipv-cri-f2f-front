const { Given, Then } = require("@cucumber/cucumber");

const {
  PhotoDlDetailsPageValid,
  PhotoDlDetailsPageInvalidFuture,
  PhotoDlDetailsPageInvalidPast,
  PhotoDlAddressCheckPage,
  ErrorPage,
} = require("../pages");
const { expect } = require("chai");

Given(
  /^the user navigates directly to uk-driving-licence-expire page$/,
  async function () {
    const photoDLDetailsPageValid = new PhotoDlDetailsPageValid(this.page);
    await photoDLDetailsPageValid.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-driving-licence-expire page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-driving-licence-expire-invalidpast page$/,
  async function () {
    const photoDLDetailsPageInvalidPast = new PhotoDlDetailsPageInvalidPast(
      this.page
    );
    await photoDLDetailsPageInvalidPast.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-driving-licence-expire-invalidpast page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-driving-licence-expire-invalidfuture page$/,
  async function () {
    const photoDLDetailsPageInvalidFuture = new PhotoDlDetailsPageInvalidFuture(
      this.page
    );
    await photoDLDetailsPageInvalidFuture.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-driving-licence-expire-invalidfuture page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-driving-licence-current-address page$/,
  async function () {
    const photoDLAddressCheckPage = new PhotoDlAddressCheckPage(this.page);
    await photoDLAddressCheckPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-driving-licence-current-address page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

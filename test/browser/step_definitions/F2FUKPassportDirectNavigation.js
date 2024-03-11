const { Given, Then } = require("@cucumber/cucumber");

const {
  PassportDetailsPageValid,
  PassportDetailsPageValidEdit,
  PassportDetailsPageInvalidFuture,
  PassportDetailsPageInvalidPast,
  ErrorPage,
} = require("../pages");
const { expect } = require("chai");

Given(
  /^the user navigates directly to uk-passport-expire page$/,
  async function () {
    const passportDetailsPageValid = new PassportDetailsPageValid(this.page);
    await passportDetailsPageValid.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-passport-expire page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-passport-expire-invalidpast page$/,
  async function () {
    const passportDetailsPageInvalidPast = new PassportDetailsPageInvalidPast(
      this.page
    );
    await passportDetailsPageInvalidPast.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-passport-expire-invalidpast page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-passport-expire-invalidfuture page$/,
  async function () {
    const passportDetailsPageInvalidFuture =
      new PassportDetailsPageInvalidFuture(this.page);
    await passportDetailsPageInvalidFuture.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-passport-expire-invalidfuture page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to uk-passport-expire-edit page$/,
  async function () {
    const passportDetailsPageValidEdit = new PassportDetailsPageValidEdit(
      this.page
    );
    await passportDetailsPageValidEdit.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the uk-passport-expire-edit page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

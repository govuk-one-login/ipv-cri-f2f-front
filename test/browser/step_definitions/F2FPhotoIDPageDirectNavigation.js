const { Given, Then } = require("@cucumber/cucumber");

const {
  PhotoIdSelectionPage,
  PhotoIdSelectionPageEdit,
  PhotoIdExpiryPage,
  ErrorPage,
} = require("../pages");
const { expect } = require("chai");

Given(
  /^the user navigates directly to photoID- expiry page$/,
  async function () {
    const photoIDExpiry = new PhotoIdExpiryPage(this.page);
    await photoIDExpiry.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the photoID- expiry page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to photoID- selection page$/,
  async function () {
    const photoIDSelection = new PhotoIdSelectionPage(this.page);
    await photoIDSelection.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the photoID- selection page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to photoID- selection- edit page$/,
  async function () {
    const photoIDSelectionEdit = new PhotoIdSelectionPageEdit(this.page);
    await photoIDSelectionEdit.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the photoID- selection- edit page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

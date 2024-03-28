const { Given, Then } = require("@cucumber/cucumber");

const { PostOfficeLocations, ErrorPage } = require("../pages");
const { expect } = require("chai");

Given(
  /^the user navigates directly to choose-post-office page$/,
  async function () {
    const postOfficeLocationsPage = new PostOfficeLocations(this.page);
    await postOfficeLocationsPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the choose-post-office page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

const { Given, Then } = require("@cucumber/cucumber");

const { CheckDetails, ErrorPage } = require("../pages");
const { expect } = require("chai");
Given(/^the user navigates directly to check-details page$/, async function () {
  const checkDetails = new CheckDetails(this.page);
  await checkDetails.goTo();
});

Then(
  /^the user sees an error message displayed on the check-details page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

const { Given, Then } = require("@cucumber/cucumber");

const { LandingPage, ErrorPage } = require("../pages");
const { expect } = require("chai");
Given(
  /^the user navigates directly to prove-identity-post-office page$/,
  async function () {
    const landingPage = new LandingPage(this.page);
    await landingPage.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the prove-identity-post-office page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

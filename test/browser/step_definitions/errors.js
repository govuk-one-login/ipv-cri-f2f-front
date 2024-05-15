const { When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { ErrorPage, IpvErrorPage } = require("../pages");

When("there is an immediate error", () => {});

Then("they should see the unrecoverable error page", async function () {
  const errorPage = new ErrorPage(this.page);

  const errorTitle = await errorPage.getErrorTitle();

  expect(errorTitle).to.equal(errorPage.getSomethingWentWrongMessage());

  expect(await errorPage.isCurrentPage()).to.be.true;
});

Then("they should see the IPV Core error page", async function () {
  const ipvErrorPage = new IpvErrorPage(this.page);

  const errorText = await ipvErrorPage.getErrorText();

  expect(errorText).to.equal(ipvErrorPage.getAuthorizationFailedMessage());

  expect(await ipvErrorPage.isCurrentPage()).to.be.true;
  expect(await ipvErrorPage.hasErrorQueryParams()).to.be.true;
});

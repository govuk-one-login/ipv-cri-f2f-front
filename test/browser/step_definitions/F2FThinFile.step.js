const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  ThinFilePage,
  PassportDetailsPageValid,
} = require("../pages");

Given(/^the Thin File UK passport option is selected$/, async function () {
  const thinFilePage = new ThinFilePage(await this.page);

  await thinFilePage.ukPassportChoiceTrue();

  expect(await thinFilePage.isCurrentPage()).to.be.true;
});

When(/^the user clicks the Thin File continue button$/, async function () {
  const thinFilePage = new ThinFilePage(await this.page);

  await thinFilePage.continue();
});

Then(
  /^the user is routed to the next screen in the Thin File journey Passport Details$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    expect(await passportDetailsPage.isCurrentPage()).to.be.true;
  }
);

const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  DoYouHaveAUkPassport,
  PassportDetailsPageValid,
} = require("../pages");

Given(/^the Thin File UK passport option is selected$/, async function () {
  const doYouHaveAUkPassport = new DoYouHaveAUkPassport(await this.page);

  await doYouHaveAUkPassport.ukPassportChoiceTrue();

  expect(await doYouHaveAUkPassport.isCurrentPage()).to.be.true;
});

When(/^the user clicks the continue button on the Do You Have UK Passport page$/, async function () {
  const doYouHaveAUkPassport = new DoYouHaveAUkPassport(await this.page);

  await doYouHaveAUkPassport.continue();
});

Then(
  /^the user is routed to the next screen in the Thin File journey - Passport Details$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    expect(await passportDetailsPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

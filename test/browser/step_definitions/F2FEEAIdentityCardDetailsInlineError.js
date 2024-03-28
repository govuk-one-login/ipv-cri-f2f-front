const { Given, When, Then, And } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EEAIdentityCardDetailsPageValid } = require("../pages");

Given(
  /^the user clicks the continue button only on the EEAPage$/,
  async function () {
    const eeaIdentityCardPage = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    await eeaIdentityCardPage.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the EEAPage$/,
  async function () {
    const eeaIdentityCardPage = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    expect(await eeaIdentityCardPage.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await eeaIdentityCardPage.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

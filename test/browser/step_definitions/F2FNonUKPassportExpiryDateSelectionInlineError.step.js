const { Given, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUkPassportHasExpiryDatePage } = require("../pages");

Given(
  /^the user clicks the continue button only on the NonUkPassportHasExpiryDatePage$/,
  async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(
      await this.page
    );

    await nonUkPassportHasExpiryDatePage.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the NonUkPassportHasExpiryDatePage$/,
  async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(
      await this.page
    );

    expect(await nonUkPassportHasExpiryDatePage.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";
    const inlineErrorBody = "Select if your photo ID has an expiry date";

    const error = await nonUkPassportHasExpiryDatePage.checkErrorText();

    expect(await error).to.equal(inlineError);

    const errorBody = await nonUkPassportHasExpiryDatePage.checkErrorBodyText();

    expect(await errorBody).to.equal(inlineErrorBody);

    const errorBodyAboveRadioOptions =
      await nonUkPassportHasExpiryDatePage.checkErrorAboveRadioButtonText();

    expect(await errorBodyAboveRadioOptions).to.equal(
      "Error: Select if your photo ID has an expiry date"
    );
  }
);

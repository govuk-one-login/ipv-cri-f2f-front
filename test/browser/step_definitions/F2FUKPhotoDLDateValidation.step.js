const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  PhotoDlDetailsPageValid,
  PhotoDlDetailsPageInvalidPast,
  PhotoDlDetailsPageInvalidFuture,
  PhotoIdExpiryPage,
  PhotoIdSelectionPage,
} = require("../pages");

Given(
  /^the date entered is before the accepted UKPhotoDLExpiry expiration window$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageInvalidPast(await this.page);

    await ukPhotoDl.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the UKPhotoDLExpiryPast Page$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageInvalidPast(await this.page);

    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the UK DL screen$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  }
);

//UK Driving Licence Future Date Validation
Given(
  /^the date entered is beyond the accepted UKPhotoDLExpiry expiration window$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageInvalidFuture(await this.page);

    await ukPhotoDl.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the UKPhotoDLExpiryFuture page$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageInvalidFuture(await this.page);

    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the UK DL Page$/,
  async function () {
    const ukDL = new PhotoDlDetailsPageInvalidFuture(await this.page);

    expect(await ukDL.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await ukDL.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//UK Driving Licence Past Date Validation Re-enter
Given(/^the ReEnterUKPhotoDLDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks UKPhotoDL Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the UKPhotoDL Expiry Date screen$/,
  async function () {
    const photoDlDetailsPageValid = new PhotoDlDetailsPageValid(
      await this.page
    );

    expect(await photoDlDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

//UKDL Expired Date Choose Another ID
Given(/^the ChooseDifferentPhotoId option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ChooseDifferentPhotoId();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks the Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the PhotoId Selection screen$/,
  async function () {
    const photoIdSelectionPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdSelectionPage.isCurrentPage()).to.be.true;
  }
);

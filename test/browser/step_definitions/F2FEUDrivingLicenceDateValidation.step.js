const { Given, When, Then, And } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  EuDrivingLicenceDetailsPageValid,
  EuDrivingLicenceDetailsPageInvalidPast,
  EuDrivingLicenceDetailsPageInvalidFuture,
  PhotoIdExpiryPage,
} = require("../pages");

Given(
  /^the date entered is before the accepted EU driving licence expiration window$/,
  async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidPast(
      await this.page
    );

    await euDrivingLicence.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the EU Driving Licence Past page$/,
  async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidPast(
      await this.page
    );

    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

    await euDrivingLicence.continue();
  }
);

Then(
  /^the user is routed to the Expired Date Error Screen from the EU Driving Licence screen$/,
  async function () {
    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  }
);

//EUDL Date Validation Future
Given(
  /^the date entered is beyond the accepted EU driving licence expiration window$/,
  async function () {
    const { EuDrivingLicenceDetailsPageInvalidFuture } = require("../pages");

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidFuture(
      await this.page
    );

    await euDrivingLicence.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the EU driving licence Future page$/,
  async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidFuture(
      await this.page
    );

    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

    await euDrivingLicence.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the EU DL Page$/,
  async function () {
    const euDL = new EuDrivingLicenceDetailsPageInvalidFuture(await this.page);

    expect(await euDL.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await euDL.checkErrorText();

    expect(await error).to.equal(inlineError);
  }
);

//EUDL Date Validation Past Re-enter
Given(/^the ReEnterEUDLDetails option is selected$/, async function () {
  const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

  await photoExpiryPage.ReEnterDetails();

  expect(await photoExpiryPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks EUDL Expired Date Error Screen continue button$/,
  async function () {
    const photoExpiryPage = new PhotoIdExpiryPage(await this.page);

    await photoExpiryPage.continue();
  }
);

Then(
  /^the user is routed back to the EU Driving Licence Expiry Date screen$/,
  async function () {
    const euDrivingLicenceDetailsPageValid =
      new EuDrivingLicenceDetailsPageValid(await this.page);

    expect(await euDrivingLicenceDetailsPageValid.isCurrentPage()).to.be.true;
  }
);

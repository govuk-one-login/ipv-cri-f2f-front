const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  PhotoIdSelectionPage,
  PassportDetailsPageValid,
  FindBranch,
} = require("../pages");

Given(/^the UK passport option is selected$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  await photoIdPage.ukPassportChoice();

  expect(await photoIdPage.isCurrentPage()).to.be.true;
});

When(/^the user clicks the PhotoId continue button$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  await photoIdPage.continue();
});

Then(
  /^the user is routed to the next screen in the journey Passport Details$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    expect(await passportDetailsPage.isCurrentPage()).to.be.true;
  }
);

//PassportDetails
Given(
  /^the date entered is in the future$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    await passportDetailsPage.expiryDateFuture();
  }
);

Given(
  /^the date entered is within the last 18 months$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    await passportDetailsPage.expiryDatePast();
  }
);

When(
  /^the user clicks the continue button on the UKPassportPage$/,
  async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  }
);

Then(
  /^the user is routed to the next screen in the journey Branch Finder Screen$/,
  async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;
  }
);

Then(/^the user enters a valid postcode$/, async function () {
  const branchFinderPage = new FindBranch(await this.page);

  await branchFinderPage.postCode();
});

When(
  /^the user enters a postcode that returns incomplete data$/,
  async function () {
    const branchFinderPage = new FindBranch(await this.page);

    await branchFinderPage.postCodeIncompleteData();
  }
);

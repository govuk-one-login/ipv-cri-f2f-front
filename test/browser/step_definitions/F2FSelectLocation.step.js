const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, PostOfficeLocations, CheckDetails } = require("../pages");

Given(/^a Post Office branch is selected$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  await poLocations.firstChoice();
});

When(/^the user clicks continue$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  await poLocations.continue();
});

Then(
  /^the user is navigated to the next step in the journey - Confirm Answer$/,
  async function () {
    const confirmAnswers = new CheckDetails(await this.page);

    expect(await confirmAnswers.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

//Select Location Change Postcode
Given(
  /^the user is on the Locations Page and wants to change their postcode$/,
  async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;
  }
);

When(/^the user clicks the Back button$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;

  await poLocations.back();
});

When(/^the user Changes the postcode$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;

  await poLocations.changePostcode();
});

Then(/^the user is navigated back to the Find Branch page$/, async function () {
  const findBranch = new FindBranch(await this.page);

  expect(await findBranch.isCurrentPage()).to.be.true;
});

Then(
  /^the user enters another postcode and is navigated back to the list of nearest POs$/,
  async function () {
    const findBranch = new FindBranch(await this.page);
    const poLocations = new PostOfficeLocations(await this.page);

    await findBranch.postCodeChange();

    await findBranch.continue();

    expect(await poLocations.isCurrentPage()).to.be.true;
  }
);

//Select Location No Post Office
Given(/^no Post Office branch is selected$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;
});

When(/^the user clicks Continue$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await poLocations.continue();
});

Then(
  /^they are shown an on screen error asking them to select a branch$/,
  async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;

    expect(await poLocations.checkErrorText()).to.contain("There is a problem");
  }
);

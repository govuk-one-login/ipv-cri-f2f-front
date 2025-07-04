const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  PhotoIdSelectionPage,
  PhotoDlDetailsPageValid,
  FindBranch,
  PhotoDlAddressCheckPage,
} = require("../pages");

Given(
  /^the UK photocard driving licence option is selected$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    await photoIdPage.drivingLicenceChoice();

    expect(await photoIdPage.isCurrentPage()).to.be.true;
  }
);

When(/^the user clicks the UK DL continue button$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  await photoIdPage.continue();
});

Then(
  /^the user is routed to the next screen in the journey UKPhotoDL Expiry Date$/,
  async function () {
    const photoDLPage = new PhotoDlDetailsPageValid(await this.page);

    expect(await photoDLPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Given(
  /^the date entered is within accepted UKPhotoDL expiration window$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);

    await ukPhotoDl.expiryDate();
  }
);

When(
  /^the user clicks the continue button on the UKPhotoDL Page$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);

    expect(await ukPhotoDl.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
    await ukPhotoDl.continue();
  }
);

Then(
  /^the user is successfully routed to the UK DL Address Check screen$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

//UKPhotoDLDetails
Given(/^the user has selected the 'Yes' option$/, async function () {
  const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

  expect(await dlAddressPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await dlAddressPage.addressYes();
});

When(
  /^the Continue button is clicked on the UK Photo DL Address page$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await dlAddressPage.continue();
  }
);

Then(
  /^the user is routed to the next screen in the UKPhotoDL journey - Branch Finder$/,
  async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Given(/^the user has selected the 'No' option$/, async function () {
  const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

  expect(await dlAddressPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await dlAddressPage.addressNo();
});

When(
  /^the Continue button is clicked on the UKPhotoDL Address page$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await dlAddressPage.continue();
  }
);

Then(
  /^the user is routed back to the previous screen - Document Selection$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Given(
  /^the user has selected the UKPhotoDL 'change address' link$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await dlAddressPage.changeAddressLink();
  }
);

Then(
  /^the UKPhotoDL 'Tell DVLA' link is clicked and a new tab opened$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await dlAddressPage.tellDvlaLink();
  }
);

Given(
  /^no option has been chosen on the UK DL Address Check screen$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

When(
  /^the user clicks Continue on the UK DL Address Check screen$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    await dlAddressPage.continue();
  }
);

Then(
  /^the user sees an inline error message displayed on the UKPhotoDL Address page$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    expect(await dlAddressPage.isCurrentPage()).to.be.true;

    expect(await dlAddressPage.checkErrorText()).to.contain(
      "There is a problem"
    );
    await this.page.waitForLoadState("networkidle");
  }
);

When(
  /^the Back button is clicked on the UK Photo DL Address page$/,
  async function () {
    const dlAddressPage = new PhotoDlAddressCheckPage(await this.page);

    await dlAddressPage.back();
  }
);

Then(
  /^the user is navigated back to the UK Photo Dl Expiry page$/,
  async function () {
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);

    expect(await ukPhotoDl.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

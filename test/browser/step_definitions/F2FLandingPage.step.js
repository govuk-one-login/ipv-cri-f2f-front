const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage, CheckDetails, DoYouHaveAUkPassport } = require("../pages");

Given(
  /^the user wants to progress to the next step of the journey$/,
  async function () {
    const landingPage = new LandingPage(await this.page);

    expect(await landingPage.isCurrentPage()).to.be.true;
  }
);

When(
  /^the user clicks the continue button on the Landing Page$/,
  async function () {
    const landingPage = new LandingPage(await this.page);

    await landingPage.continue();
  }
);

Then(
  /^the user is routed to the next screen in the journey PhotoId Selection$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user is routed to the next screen in the Thin File journey - Do You Have UK Passport$/,
  async function () {
    const doYouHaveAUkPassport = new DoYouHaveAUkPassport(await this.page);

    expect(await doYouHaveAUkPassport.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

When(
  /^the user selects I do not have any of these documents$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
    const cmPage = new CheckDetails(await this.page);

    await photoIdPage.noDocumentAbortChoice();
    await photoIdPage.continue();

    this.state = await cmPage.setSessionState();
  }
);

import { Given, When, Then } from "@cucumber/cucumber";

import { expect } from "chai";

import { PhotoIdSelectionPage, LandingPage } from "../pages/index.js";

Given(
  /^the user has navigated to the Document Selection page$/,
  async function () {
    const photoIdSelection = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdSelection.isCurrentPage()).to.be.true;
  }
);

When(
  /^the Back link is clicked on the Document Selection page$/,
  async function () {
    const photoIdSelection = new PhotoIdSelectionPage(await this.page);

    await photoIdSelection.back();
  }
);

Then(
  /^the user is navigated back to the previous screen - the Landing page$/,
  async function () {
    const landingPage = new LandingPage(await this.page);

    expect(await landingPage.isCurrentPage()).to.be.true;
  }
);

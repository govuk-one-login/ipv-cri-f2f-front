import { Given, Then } from "@cucumber/cucumber";

import { PostOfficeLocations, ErrorPage } from "../pages/index.js";
import { expect } from "chai";

Given(
  /^the user navigates directly to choose-post-office page$/,
  async function () {
    const postOfficeLocationsPage = new PostOfficeLocations(this.page);
    await postOfficeLocationsPage.goTo();
  },
);

Then(
  /^the user sees an error message displayed on the choose-post-office page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  },
);

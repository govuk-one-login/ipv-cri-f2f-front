const { Given, Then } = require("@cucumber/cucumber");

const { PostOfficeLocations } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to choose-post-office page$/, async function () {
    const postOfficeLocationsPage = new PostOfficeLocations(this.page);
    await postOfficeLocationsPage.goTo();

});

Then(/^the user sees an error message displayed on the choose-post-office page$/, async function () {
    const postOfficeLocationsPage = new PostOfficeLocations(await this.page);
    expect(await postOfficeLocationsPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await postOfficeLocationsPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});
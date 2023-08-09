const { Given, Then } = require("@cucumber/cucumber");

const { CheckDetails } = require("../pages");
const { expect } = require("chai");
Given(/^the user navigates directly to check-details page$/, async function () {
    const checkDetails = new CheckDetails(this.page);
    await checkDetails.goTo();

});

Then(/^the user sees an error message displayed on the check-details page$/, async function () {
    const checkDetails = new CheckDetails(await this.page);
    expect(await checkDetails.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await checkDetails.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});
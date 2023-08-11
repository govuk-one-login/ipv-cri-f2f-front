const { Given, Then } = require("@cucumber/cucumber");

const { BRPDetailsPageInvalidFuture, BRPDetailsPageInvalidPast,
    BRPDetailsPageValid } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to brp-invalid-future-expiry page$/, async function () {
    const brpDetailsInvalidFuture = new BRPDetailsPageInvalidFuture(this.page);
    await brpDetailsInvalidFuture.goTo();

});

Then(/^the user sees an error message displayed on the brp-invalid-future-expiry page$/, async function () {
    const brpDetailsInvalidFuture = new BRPDetailsPageInvalidFuture(await this.page);
    expect(await brpDetailsInvalidFuture.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await brpDetailsInvalidFuture.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to brp-invalid-past-expiry page$/, async function () {
    const brpDetailsInvalidPast = new BRPDetailsPageInvalidPast(this.page);
    await brpDetailsInvalidPast.goTo();

});

Then(/^the user sees an error message displayed on the brp-invalid-past-expiry page$/, async function () {
    const brpDetailsInvalidPast = new BRPDetailsPageInvalidPast(await this.page);
    expect(await brpDetailsInvalidPast.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await brpDetailsInvalidPast.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to brp-valid page$/, async function () {
    const brpDetailsValid = new BRPDetailsPageValid(this.page);
    await brpDetailsValid.goTo();

});

Then(/^the user sees an error message displayed on the brp-valid page$/, async function () {
    const brpDetailsValid = new BRPDetailsPageValid(await this.page);
    expect(await brpDetailsValid.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await brpDetailsValid.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});